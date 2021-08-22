import * as types from '../constants/post';

export const createPost = (payload) => ({
  type: types.CREATE_POST_REQUEST,
  payload,
});

export const getTimeLinePosts = () => ({
  type: types.FETCH_TIMELINE_POST_REQUEST,
});
