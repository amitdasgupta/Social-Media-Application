import * as types from '../constants/comment';

export const createComment = (payload) => ({
  type: types.CREATE_COMMENT_REQUEST,
  payload,
});

export const getPostComments = () => ({
  type: types.FETCH_POST_COMMENTS_REQUEST,
});

export const likeComment = (id) => ({
  type: types.LIKE_COMMENT_REQUEST,
  id: id,
});

export const unLikeComment = (id) => ({
  type: types.UNLIKE_COMMENT_REQUEST,
  id: id,
});
