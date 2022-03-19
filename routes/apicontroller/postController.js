const express = require('express');
const mongoose = require('mongoose');
const customResponse = require('../../helpers/customResponse');
const User = require('../../database/models/User');
const Post = require('../../database/models/Post');
const {
  isPostManipulationAllowed,
  isPostVisible,
} = require('../../helpers/Post');
const { uploadImageAndGivePath } = require('../../helpers/fileHelpers');
const { upload } = require('../../helpers/multer');

const router = express.Router();
// create a post
// update a post
// delete a post
// like a post
// unlike a post
// get a post
// get all post
// get timeline post

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { file } = req;
    let uploadedImageUrl = null;
    if (file) {
      uploadedImageUrl = await uploadImageAndGivePath(file);
    }
    const userId = req.user.id;
    const { desc, location } = req.body;
    let post = new Post({
      desc,
      userId,
      image: uploadedImageUrl,
      location,
    });
    await User.findByIdAndUpdate(userId, {
      $push: { posts: post.id },
    });
    post = await post
      .populate([{ path: 'userId', select: 'username profilepic' }])
      .execPopulate();
    await post.save();
    return customResponse(res, 200, post);
  } catch (err) {
    return next(err);
  }
});

router.put('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (isPostManipulationAllowed(post, req.user)) {
      const { desc, image = '' } = req.body;
      await Post.findByIdAndUpdate(postId, {
        $set: { desc, image },
      });
      return customResponse(res, 200);
    }
    return customResponse(res, 403);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const post = await Post.findById(postId);
    if (isPostManipulationAllowed(post, req.user)) {
      await Promise.all([
        User.findByIdAndUpdate(userId, {
          $pull: { posts: post.id },
        }),
        Post.findByIdAndDelete(postId),
      ]);
      return customResponse(res, 200);
    }
    return customResponse(res, 403);
  } catch (err) {
    return next(err);
  }
});

router.put('/:postId/like', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const post = await Post.findById(postId);
    if (post.likes.includes(userId))
      return customResponse(res, 200, 'Already liked this post');
    post.likes.push(userId);
    await post.save();
    return customResponse(res, 200);
  } catch (err) {
    return next(err);
  }
});

router.put('/:postId/unlike', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: userId },
    });
    return customResponse(res, 200);
  } catch (err) {
    return next(err);
  }
});

router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId).populate('userId').lean();
    if (isPostVisible(post, req.user)) {
      const { userId, ...rest } = post;
      return customResponse(res, 200, rest);
    }
    return customResponse(res, 403);
  } catch (err) {
    return next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allPosts = await Post.find({ userId }).lean();
    return customResponse(res, 200, allPosts);
  } catch (err) {
    return next(err);
  }
});

router.get('/timelinePosts/all', async (req, res, next) => {
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
        $lookup: {
          from: 'comments',
          let: {
            commentPostId: '$_id',
          },
          pipeline: [
            { $match: { $expr: { $eq: ['$postId', '$$commentPostId'] } } },
            { $project: { _id: 1 } },
          ],
          as: 'comments',
        },
      },
      {
        $set: {
          userName: '$userId.username',
          userId: '$userId._id',
          profilepic: '$userId.profilepic',
          comments: { $size: '$comments' },
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
