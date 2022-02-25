const express = require('express');
const customResponse = require('../../helpers/customResponse');
const User = require('../../database/models/User');
const { generateNewPassword } = require('../../helpers/authentication');
const { isUserAllowedOperation } = require('../../helpers/users');
const { doesObjectIdExistInList } = require('../../helpers/queryHelpers');
const { upload } = require('../../helpers/multer');
const { uploadImageAndGivePath } = require('../../helpers/fileHelpers');

const router = express.Router();
// create a user
// update a user
// get a user
// follow a user
// unfollow a user

router.put(
  '/:id',
  upload.fields([
    { name: 'coverPicture', maxCount: 1 },
    { name: 'profilepic', maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      if (isUserAllowedOperation(req, userId)) {
        const { files } = req;
        const filesKeys = Object.keys(files);
        const mappingOfFileswithUrls = {};
        if (filesKeys.length) {
          for (let index = 0; index < filesKeys.length; index += 1) {
            const fileKey = filesKeys[index];
            // eslint-disable-next-line no-await-in-loop
            const uploadedImageUrl = await uploadImageAndGivePath(
              files[fileKey][0]
            );
            mappingOfFileswithUrls[fileKey] = uploadedImageUrl;
          }
        }

        console.log(req.body);

        await User.findByIdAndUpdate(userId, {
          $set: { ...req.body, ...mappingOfFileswithUrls },
        });
        return customResponse(res, 200);
      }
      return customResponse(res, 403);
    } catch (error) {
      next(error);
    }
  }
);

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
    });

    return customResponse(res, 200, allUsers);
  } catch (error) {
    next(error);
  }
});

router.get('/validusers/:userId', async (req, res, next) => {
  try {
    const userId = req.params.id;

    const userData = await User.findById(userId).select(
      'username profilepic followers following'
    );
    return customResponse(res, 200, userData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
