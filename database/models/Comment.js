const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    postId: {
      type: ObjectId,
      required: true,
      ref: 'Post',
    },
    desc: {
      type: String,
      max: 500,
    },
    likes: {
      type: [ObjectId],
      default: [],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.model('Comment', CommentSchema);

module.exports = commentModel;
