const express = require('express');
const customResponse = require('../../helpers/customResponse');
const User = require('../../database/models/User');
const { generateNewPassword } = require('../../helpers/authentication');
const { isUserAllowedOperation } = require('../../helpers/users');

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
      const { password } = req.body;
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

router.put('/:id/follow', async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (isUserAllowedOperation(req, userId)) {
      return customResponse(res, 200);
    }
    return customResponse(res, 403);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
