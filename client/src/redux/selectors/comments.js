export const getCommentMetaData = (state, postId) => {
  const { comments: { postCommentDataMapping = {} } = {} } = state;
  const commentData = postCommentDataMapping[postId] || {};
  const { metaData = { pageNo: 0, size: 10, total: 10 } } = commentData;
  return metaData;
};
