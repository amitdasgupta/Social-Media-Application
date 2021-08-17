import * as types from '../constants/user';

export const getLoggedInUserData = () => ({
  type: types.LOGGEDIN_USERDATA_REQUEST,
});
