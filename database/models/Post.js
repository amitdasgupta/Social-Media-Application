const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    desc: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
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

const postModel = mongoose.model('Post', PostSchema);

module.exports = postModel;
