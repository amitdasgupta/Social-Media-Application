const customResponse = require('../helpers/customResponse');
const User = require('../database/models/User');
const { decodeToken } = require('../helpers/authentication');

async function isAuthorized(req, res, next) {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) throw new Error('Not authorized');
    // Bearer eyJhbGciOiJIUz
    const authToken = authHeader.split(' ')[1];
    if (!authToken) throw new Error('Not authorized');
    const decodedToken = decodeToken(authToken);
    if (decodedToken) {
      const user = await User.findById(decodedToken.userId);
      req.user = user;
      return next();
    }
    return customResponse(res, { message: 'You are not authenticated' }, 403);
  } catch (error) {
    error.status = 403;
    return next(error);
  }
}

module.exports = isAuthorized;
