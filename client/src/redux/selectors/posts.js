export const getPostMetaData = (state) => {
  const { posts: { metaData = {} } = {} } = state;
  return metaData;
};

export const getPostData = (state, postId) => {
  const { posts: { allPostsData = {} } = {} } = state;
  const {
    userId: postOwnerId = null,
    desc,
    image,
  } = allPostsData[postId] || {};
  return { postOwnerId, desc, image };
};
