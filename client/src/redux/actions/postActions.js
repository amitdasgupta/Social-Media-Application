import * as types from '../constants/post';

export const createPost = (payload) => ({
  type: types.CREATE_POST_REQUEST,
  payload,
});
