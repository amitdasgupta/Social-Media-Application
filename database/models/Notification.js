const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const NotificationSchema = new mongoose.Schema(
  {
    initiatedUser: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    notifiedUser: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['likePost', 'likeComment', 'comment', 'follow'],
      default: 'likePost',
    },
    on: {
      type: ObjectId,
      required: true,
      refPath: 'onModel',
    },
    onModel: {
      type: String,
      required: true,
      enum: ['User', 'Post', 'Comment'],
    },
  },
  {
    timestamps: true,
  }
);

const notificationModel = mongoose.model('Notification', NotificationSchema);

module.exports = notificationModel;
