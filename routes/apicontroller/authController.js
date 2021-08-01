const express = require('express');
const customResponse = require('../../helpers/customResponse');
const User = require('../../database/models/User');
const {
  giveEncryptedPassword,
  compareUserPassword,
  getToken,
} = require('../../helpers/authentication');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const doesUserExistWithSameEmail = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (doesUserExistWithSameEmail)
      return customResponse(
        res,
        200,
        null,
        'User with same email or username already exist'
      );
    const encryptedPassword = await giveEncryptedPassword(password);
    const user = await new User({
      username: username,
      email: email,
      password: encryptedPassword,
    });
    user.save();
    return customResponse(res, { message: 'Successfully Registered' }, 200);
  } catch (err) {
    return next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({
      email,
    })
      .select('+password')
      .lean();
    if (!user) return customResponse(res, 404);
    const { password: userPassword, ...restDataOfUser } = user;
    const isPasswordCorrect = await compareUserPassword(password, userPassword);
    if (!isPasswordCorrect) return customResponse(res, 403);
    const jwtToken = getToken({
      // eslint-disable-next-line no-underscore-dangle
      userId: restDataOfUser._id,
    });
    return customResponse(res, 200, {
      ...restDataOfUser,
      acessToken: jwtToken,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
