const {
  doesObjectIdExistInList,
  compareObjectIdsKeys,
} = require('./queryHelpers');

module.exports = {
  isPostManipulationAllowed: (post, user) =>
    user && post && (post.userId.equals(user.id) || user.isAdmin),
  isPostVisible: (post, user) => {
    const postOwner = post.userId;
    const isUserFollower = doesObjectIdExistInList(
      postOwner.followers,
      user.id
    );
    return (
      (postOwner && isUserFollower) ||
      (user && (user.isAdmin || compareObjectIdsKeys(postOwner, user)))
    );
  },
};
