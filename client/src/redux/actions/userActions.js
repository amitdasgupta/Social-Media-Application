import * as types from '../constants/user';

export const loginUser = (payload) => ({
  type: types.LOGGEDIN_USERDATA_REQUEST,
  payload,
});
