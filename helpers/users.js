module.exports = {
  isUserAllowedOperation: (req, userId) =>
    req.user && (req.user.id === userId || req.user.isAdmin),
};
