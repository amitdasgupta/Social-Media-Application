import * as types from '../constants/comment';

export const createComment = (payload) => ({
  type: types.CREATE_COMMENT_REQUEST,
  payload,
});

export const getPostComments = (postId) => ({
  type: types.FETCH_POST_COMMENTS_REQUEST,
  payload: {
    postId,
  },
});

export const toggleLikeComment = (id, isCommentLiked) => ({
  type: types.TOGGLE_LIKE_COMMENT_REQUEST,
  id,
  isCommentLiked,
});
