const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      select: false,
    },
    profilepic: {
      type: String,
      default: null,
    },
    coverPicture: {
      type: String,
      default: null,
    },
    followers: {
      type: [ObjectId],
      default: [],
      ref: 'User',
    },
    following: {
      type: [ObjectId],
      default: [],
      ref: 'User',
    },
    posts: {
      type: [ObjectId],
      default: [],
      ref: 'Post',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    country: {
      type: String,
      max: 50,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
