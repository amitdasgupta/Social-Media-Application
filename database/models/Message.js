const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const MessageSchema = new mongoose.Schema(
  {
    from: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    to: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    message: {
      type: String,
      max: 500,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model('Message', MessageSchema);

module.exports = messageModel;
