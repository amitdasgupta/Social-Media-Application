const express = require('express');

const customResponse = require('../../helpers/customResponse');
const User = require('../../database/models/User');
const Post = require('../../database/models/Post');
const {
  isPostManipulationAllowed,
  isPostVisible,
} = require('../../helpers/Post');
const { uploadImageAndGivePath } = require('../../helpers/fileHelpers');

const router = express.Router();
// create a post
// update a post
// delete a post
// like a post
// unlike a post
// get a post
// get all post
// get timeline post

router.post('/', async (req, res, next) => {
  try {
    const { file } = req;
    let uploadedImageUrl = null;
    if (file) {
      uploadedImageUrl = await uploadImageAndGivePath(file);
    }
    const userId = req.user.id;
    const { desc } = req.body;
    let post = new Post({
      desc,
      userId,
      image: uploadedImageUrl,
    });
    await User.findByIdAndUpdate(userId, {
      $push: { posts: post.id },
    });
    post = await post
      .populate({
        path: 'userId',
        select: 'username',
      })
      .execPopulate();
    console.log(post);
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
    await Post.findByIdAndUpdate(postId, {
      $push: { likes: userId },
    });
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
    // console.log('hello');
    const userId = req.user.id;
    const allPosts = await Post.find({
      userId: {
        $in: [...req.user.followers, userId],
      },
    })
      .sort({ updatedAt: -1 })
      .lean()
      .populate({
        path: 'userId',
        select: 'username',
      });
    return customResponse(res, 200, allPosts);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
