const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  getToken: function (payload) {
    return jwt.sign(payload, process.env.TOKEN_KEY, {
      expiresIn: '24h',
    });
  },
  decodeToken: function (token) {
    return jwt.verify(token, process.env.TOKEN_KEY);
  },
  giveEncryptedPassword: function (password) {
    return bcrypt.hash(password, 10);
  },
  compareUserPassword: function (password, userPassword) {
    return bcrypt.compare(password, userPassword);
  },
  generateNewPassword: async function (password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  },
};
