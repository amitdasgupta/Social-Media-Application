const express = require('express');
const customResponse = require('../../helpers/customResponse');
const User = require('../../database/models/User');
const { generateNewPassword } = require('../../helpers/authentication');
const { isUserAllowedOperation } = require('../../helpers/users');
const { doesObjectIdExistInList } = require('../../helpers/queryHelpers');

const router = express.Router();
// create a user
// update a user
// get a user
// follow a user
// unfollow a user

router.put('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (isUserAllowedOperation(req, userId)) {
      const { password, email, username, isAdmin } = req.body;
      if ((email || username || isAdmin) && !req.user.isAdmin)
        return customResponse(res, 403);
      if (password) {
        const newPassword = await generateNewPassword(password);
        req.body.password = newPassword;
      }
      await User.findByIdAndUpdate(userId, {
        $set: req.body,
      });
      return customResponse(res, 200);
    }
    return customResponse(res, 403);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (isUserAllowedOperation(req, userId)) {
      await User.findByIdAndDelete(userId);
      return customResponse(res, 200);
    }
    return customResponse(res, 403);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (isUserAllowedOperation(req, userId)) {
      const user = await User.findById(userId);
      return customResponse(res, 200, user);
    }
    return customResponse(res, 403);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    return customResponse(res, 200, user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/follow', async (req, res, next) => {
  try {
    const userIdFollowed = req.params.id;
    const currentUserId = req.user.id;
    const userData = await User.findByIdAndUpdate(currentUserId).lean();
    if (doesObjectIdExistInList(userData.following, userIdFollowed))
      return customResponse(res, 200, userIdFollowed);
    await Promise.all([
      User.findByIdAndUpdate(currentUserId, {
        $push: { following: userIdFollowed },
      }),
      User.findByIdAndUpdate(userIdFollowed, {
        $push: { followers: currentUserId },
      }),
    ]);
    const { io } = global;
    console.log(io);
    return customResponse(res, 200, userIdFollowed);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/unfollow', async (req, res, next) => {
  try {
    const userIdFollowed = req.params.id;
    const currentUserId = req.user.id;
    const userData = await User.findByIdAndUpdate(currentUserId).lean();
    if (!doesObjectIdExistInList(userData.following, userIdFollowed))
      return customResponse(res, 200, userIdFollowed);
    await Promise.all([
      User.findByIdAndUpdate(currentUserId, {
        $pull: { following: userIdFollowed },
      }),
      User.findByIdAndUpdate(userIdFollowed, {
        $pull: { followers: currentUserId },
      }),
    ]);
    return customResponse(res, 200, userIdFollowed);
  } catch (error) {
    next(error);
  }
});

router.get('/validusers/all', async (req, res, next) => {
  try {
    const userId = req.user.id;

    const allUsers = await User.find({
      id: {
        $ne: userId,
      },
    }).select('username profilepic followers following');

    return customResponse(res, 200, allUsers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
