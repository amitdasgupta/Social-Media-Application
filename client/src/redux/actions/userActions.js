import * as types from '../constants/user';

export const loginUser = (payload) => ({
  type: types.USER_LOGIN_REQUEST,
  payload,
});
