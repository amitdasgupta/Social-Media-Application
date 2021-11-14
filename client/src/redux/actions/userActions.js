import * as types from '../constants/user';

export const getLoggedInUserData = () => ({
  type: types.LOGGEDIN_USERDATA_REQUEST,
});

export const getAllUsersData = () => ({
  type: types.ALL_USERSDATA_REQUEST,
});
