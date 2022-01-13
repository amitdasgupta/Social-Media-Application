export const getPostMetaData = (state) => {
  const { posts: { metaData = {} } = {} } = state;
  return metaData;
};
