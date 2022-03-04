const express = require('express');
const mongoose = require('mongoose');
const customResponse = require('../../helpers/customResponse');
const User = require('../../database/models/User');
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
          const uploadedImagesUrls = await Promise.all(
            filesKeys.map((file) => uploadImageAndGivePath(files[file][0]))
          );
          for (let index = 0; index < filesKeys.length; index += 1) {
            const fileKey = filesKeys[index];
            mappingOfFileswithUrls[fileKey] = uploadedImagesUrls[index];
          }
        }

        const user = await User.findByIdAndUpdate(
          userId,
          {
            $set: { ...req.body, ...mappingOfFileswithUrls },
          },
          { new: true }
        );
        return customResponse(res, 200, user);
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
    const { pageNo = 1, size = 10, search = '' } = req.query;
    if (Number.isNaN(Number(pageNo)) || Number.isNaN(Number(size))) {
      throw new Error('Query param is not number');
    }

    const query = {
      skip: size * (parseInt(pageNo, 10) - 1),
      limit: parseInt(size, 10),
    };

    const allUsers = await User.aggregate([
      {
        $match: {
          _id: {
            $ne: mongoose.Types.ObjectId(userId),
          },
          username: {
            $regex: search,
          },
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

    return customResponse(res, 200, allUsers[0]);
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
