const express = require('express');
const mongoose = require('mongoose');
const customResponse = require('../../helpers/customResponse');
const Post = require('../../database/models/Post');
const Comment = require('../../database/models/Comment');
const { upload } = require('../../helpers/multer');

const router = express.Router();
// create a comment
// update a comment
// delete a comment
// like a comment
// unlike a comment
// get a comment
// get all comment
// get timeline comment

router.post('/:postId', upload.single('image'), async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { desc } = req.body;
    const { postId } = req.params;
    let comment = new Comment({
      desc,
      userId,
      postId,
    });
    comment = await comment
      .populate([{ path: 'userId', select: 'username profilepic' }])
      .execPopulate();
    await comment.save();
    return customResponse(res, 200, comment);
  } catch (err) {
    return next(err);
  }
});

// router.put('/:postId', async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const post = await Post.findById(postId);
//     if (isPostManipulationAllowed(post, req.user)) {
//       const { desc, image = '' } = req.body;
//       await Post.findByIdAndUpdate(postId, {
//         $set: { desc, image },
//       });
//       return customResponse(res, 200);
//     }
//     return customResponse(res, 403);
//   } catch (err) {
//     return next(err);
//   }
// });

// router.delete('/:postId', async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const userId = req.user.id;
//     const post = await Post.findById(postId);
//     if (isPostManipulationAllowed(post, req.user)) {
//       await Promise.all([
//         User.findByIdAndUpdate(userId, {
//           $pull: { posts: post.id },
//         }),
//         Post.findByIdAndDelete(postId),
//       ]);
//       return customResponse(res, 200);
//     }
//     return customResponse(res, 403);
//   } catch (err) {
//     return next(err);
//   }
// });

router.put('/:commentId/like', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    const comment = await Post.findById(commentId);
    if (comment.likes.includes(userId))
      return customResponse(res, 200, 'Already liked this post');
    comment.likes.push(userId);
    await comment.save();
    return customResponse(res, 200);
  } catch (err) {
    return next(err);
  }
});

router.put('/:commentId/unlike', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    await Post.findByIdAndUpdate(commentId, {
      $pull: { likes: userId },
    });
    return customResponse(res, 200);
  } catch (err) {
    return next(err);
  }
});

// router.get('/:postId', async (req, res, next) => {
//   try {
//     const { postId } = req.params;
//     const post = await Post.findById(postId).populate('userId').lean();
//     if (isPostVisible(post, req.user)) {
//       const { userId, ...rest } = post;
//       return customResponse(res, 200, rest);
//     }
//     return customResponse(res, 403);
//   } catch (err) {
//     return next(err);
//   }
// });

// router.get('/', async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const allPosts = await Post.find({ userId }).lean();
//     return customResponse(res, 200, allPosts);
//   } catch (err) {
//     return next(err);
//   }
// });

router.get('/:postId/getAllComments', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { pageNo = 1, size = 10, search = '' } = req.query;
    if (Number.isNaN(Number(pageNo)) || Number.isNaN(Number(size))) {
      throw new Error('Query param is not number');
    }
    const query = {
      skip: size * (parseInt(pageNo, 10) - 1),
      limit: parseInt(size, 10),
    };
    const allPosts = await Post.aggregate([
      {
        $match: {
          userId: {
            $in: [
              ...req.user.following.map(
                (id) => new mongoose.Types.ObjectId(id)
              ),
              mongoose.Types.ObjectId(userId),
            ],
          },
          desc: {
            $regex: search,
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          let: {
            postUserId: '$userId',
          },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$postUserId'] } } },
            { $project: { profilepic: 1, username: 1 } },
          ],
          as: 'userId',
        },
      },
      { $unwind: '$userId' },
      {
        $set: {
          userName: '$userId.username',
          userId: '$userId._id',
          profilepic: '$userId.profilepic',
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { page: parseInt(pageNo, 10) } },
          ],
          data: [{ $skip: query.skip }, { $limit: query.limit }], // add projection here wish you re-shape the docs
        },
      },
      {
        $project: {
          total: { $arrayElemAt: ['$metadata.total', 0] },
          pageNo: { $arrayElemAt: ['$metadata.page', 0] },
          data: 1,
        },
      },
    ]);
    return customResponse(res, 200, allPosts[0]);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
