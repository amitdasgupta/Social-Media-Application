import * as types from '../constants/user';

export const getLoggedInUserData = () => ({
  type: types.LOGGEDIN_USERDATA_REQUEST,
});

export const getAllUsersData = () => ({
  type: types.ALL_USERSDATA_REQUEST,
});

export const followUser = (userData) => ({
  type: types.FOLLOW_USER_REQUEST,
  payload: userData,
});

export const unFollowUser = (userData) => ({
  type: types.UNFOLLOW_USER_REQUEST,
  payload: userData,
});

export const updateUser = (userData) => ({
  type: types.UPDATE_USER_REQUEST,
  payload: userData,
});
