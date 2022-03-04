import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import {
  getAuthUserData,
  getAllUserData,
  followUser,
  unFollowUser,
  updateUser,
} from '../../apis/user';
import { setError } from '../actions/errorActions';
import { setSuccessMsg } from '../actions/successActions';
import { getUserMetaData } from '../selectors/users';
import * as types from '../constants/user';
import * as socketsConstants from '../constants/socket';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* getLoggedInUserData() {
  try {
    const userData = yield call(getAuthUserData);
    const { data: { response = {} } = {} } = userData;
    yield put({ type: types.LOGGEDIN_USERDATA_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.LOGGEDIN_USERDATA_FAIL, error });
  }
}

export function* getAllValidUsersData() {
  try {
    const metaData = yield select(getUserMetaData);
    const userData = yield call(getAllUserData, metaData);
    const { data: { response: { data = [], total } = {} } = {} } = userData;
    yield put({
      type: types.ALL_USERSDATA_SUCCESS,
      payload: {
        result: data,
        metaData: {
          ...metaData,
          total: total,
        },
      },
    });
  } catch (error) {
    console.log('error', error);
    yield put({ type: types.LOGGEDIN_USERDATA_FAIL, error });
  }
}

export function* followUserRequest({ payload: { userId, username } }) {
  try {
    const result = yield call(followUser, userId);
    const { data: { response = {} } = {} } = result;
    yield put({
      type: types.FOLLOW_USER_SUCCESS,
      payload: {
        userId: response,
      },
    });
    yield put({
      type: socketsConstants.SOCKET_FOLLOW_REQUESTS_UPDATE,
      payload: {
        userId: response,
      },
    });
    yield put(setSuccessMsg(`You followed ${username}`));
  } catch (error) {
    yield put(setError(error.response));
  }
}

export function* unFollowUserRequest({ payload: { userId, username } }) {
  try {
    const result = yield call(unFollowUser, userId);
    const { data: { response = {} } = {} } = result;
    yield put({
      type: types.UNFOLLOW_USER_SUCCESS,
      payload: {
        userId: response,
      },
    });
    yield put(setSuccessMsg(`You unfollowed ${username}`));
  } catch (error) {
    yield put(setError(error.response.data));
  }
}

export function* updateUserRequest({ payload }) {
  try {
    const result = yield call(updateUser, payload);
    const { data: { response = {} } = {} } = result;
    yield put({
      type: types.UPDATE_USER_SUCCESS,
      payload: {
        userData: response,
      },
    });
    yield put(setSuccessMsg(`Your profile updated`));
  } catch (error) {
    yield put(setError(error.response.data));
  }
}

export default function* userRoot() {
  yield all([
    takeLatest(types.LOGGEDIN_USERDATA_REQUEST, getLoggedInUserData),
    takeLatest(types.ALL_USERSDATA_REQUEST, getAllValidUsersData),
    takeLatest(types.FOLLOW_USER_REQUEST, followUserRequest),
    takeLatest(types.UNFOLLOW_USER_REQUEST, unFollowUserRequest),
    takeLatest(types.UPDATE_USER_REQUEST, updateUserRequest),
  ]);
}
