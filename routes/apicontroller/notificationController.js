const express = require('express');
const mongoose = require('mongoose');
const customResponse = require('../../helpers/customResponse');
const Notification = require('../../database/models/Notification');
const { doesSameNotificationExsit } = require('../../helpers/notifications');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { notifiedUser, type, postId, commentId } = req.body;
    let dataForNotification = { initiatedUser: userId, notifiedUser };
    let remainingData = {};
    switch (type) {
      case 'follow': {
        remainingData = {
          type: 'follow',
          onModel: 'User',
          modelId: notifiedUser,
        };

        break;
      }
      case 'likePost': {
        remainingData = {
          type: 'likePost',
          onModel: 'Post',
          modelId: postId,
        };
        break;
      }
      case 'comment': {
        remainingData = {
          type: 'comment',
          onModel: 'Comment',
          modelId: commentId,
        };
        break;
      }
      default:
        remainingData = null;
    }
    dataForNotification = { ...dataForNotification, ...remainingData };
    if (
      (await doesSameNotificationExsit(dataForNotification)) ||
      !remainingData
    ) {
      return customResponse(res, 200);
    }
    await Notification.create(dataForNotification);
    return customResponse(res, 200);
  } catch (err) {
    return next(err);
  }
});

router.get('/all', async (req, res, next) => {
  try {
    const userId = req.user.id;
    // will need to implement fetch notification here
    const { pageNo = 1, size = 25 } = req.query;
    if (Number.isNaN(Number(pageNo)) || Number.isNaN(Number(size))) {
      throw new Error('Query param is not number');
    }
    const query = {
      skip: size * (parseInt(pageNo, 10) - 1),
      limit: parseInt(size, 10),
    };
    const followedNotifications = await Notification.aggregate([
      {
        $match: {
          notifiedUser: {
            $eq: mongoose.Types.ObjectId(userId),
          },
          type: {
            $eq: 'follow',
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          let: {
            postUserId: '$initiatedUser',
          },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$postUserId'] } } },
            { $project: { profilepic: 1, username: 1 } },
          ],
          as: 'initiatedUser',
        },
      },
      { $unwind: '$initiatedUser' },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          createdAt: 1,
          userName: '$initiatedUser.username',
          type: 1,
          userId: '$initiatedUser._id',
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { page: parseInt(pageNo, 10) } },
          ],
          data: [{ $skip: query.skip }, { $limit: query.limit }],
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

    const commentNotifications = await Notification.aggregate([
      {
        $match: {
          notifiedUser: {
            $eq: mongoose.Types.ObjectId(userId),
          },
          type: {
            $in: ['comment', 'likeComment'],
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          let: {
            postUserId: '$initiatedUser',
          },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$postUserId'] } } },
            { $project: { profilepic: 1, username: 1 } },
          ],
          as: 'initiatedUser',
        },
      },
      { $unwind: '$initiatedUser' },
      {
        $lookup: {
          from: 'comments',
          let: {
            modelId: '$modelId',
          },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$modelId'] } } },
            {
              $lookup: {
                from: 'posts',
                let: {
                  postId: '$postId',
                },
                pipeline: [
                  { $match: { $expr: { $eq: ['$_id', '$$postId'] } } },
                  { $project: { image: 1, desc: 1 } },
                ],
                as: 'postData',
              },
            },
            { $unwind: '$postData' },
            {
              $project: {
                postId: 1,
                commentDesc: '$desc',
                desc: '$postData.desc',
                image: '$postData.image',
              },
            },
          ],
          as: 'commentData',
        },
      },
      { $unwind: '$commentData' },

      { $sort: { createdAt: -1 } },
      {
        $project: {
          createdAt: 1,
          userName: '$initiatedUser.username',
          type: 1,
          userId: '$initiatedUser._id',
          commentId: '$commentData._id',
          postId: '$commentData.postId',
          commentDesc: '$commentData.commentDesc',
          desc: '$commentData.desc',
          image: '$commentData.image',
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { page: parseInt(pageNo, 10) } },
          ],
          data: [{ $skip: query.skip }, { $limit: query.limit }],
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

    const postLikedNotifications = await Notification.aggregate([
      {
        $match: {
          notifiedUser: {
            $eq: mongoose.Types.ObjectId(userId),
          },
          type: {
            $eq: 'likePost',
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          let: {
            postUserId: '$initiatedUser',
          },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$postUserId'] } } },
            { $project: { profilepic: 1, username: 1 } },
          ],
          as: 'initiatedUser',
        },
      },
      { $unwind: '$initiatedUser' },
      {
        $lookup: {
          from: 'posts',
          let: {
            modelId: '$modelId',
          },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$modelId'] } } },
            { $project: { image: 1, desc: 1 } },
          ],
          as: 'postData',
        },
      },
      { $unwind: '$postData' },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          createdAt: 1,
          userName: '$initiatedUser.username',
          type: 1,
          userId: '$initiatedUser._id',
          postId: '$postData._id',
          desc: '$postData.desc',
          image: '$postData.image',
        },
      },
      {
        $facet: {
          metadata: [
            { $count: 'total' },
            { $addFields: { page: parseInt(pageNo, 10) } },
          ],
          data: [{ $skip: query.skip }, { $limit: query.limit }],
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

    const notifications = {
      likePost: postLikedNotifications[0],
      comment: commentNotifications[0],
      follow: followedNotifications[0],
    };

    return customResponse(res, 200, notifications);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
