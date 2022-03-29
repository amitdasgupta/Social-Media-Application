export const getPostMetaData = (state) => {
  const { posts: { metaData = {} } = {} } = state;
  return metaData;
};

export const getPostOwnerId = (state, postId) => {
  const { posts: { allPostsData = {} } = {} } = state;
  const { userId: postOwnerId = null } = allPostsData[postId] || {};
  return postOwnerId;
};
