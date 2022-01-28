import { put, call, takeLatest, all, takeEvery } from 'redux-saga/effects';
import {
  getAuthUserData,
  getAllUserData,
  followUser,
  unFollowUser,
} from '../../apis/user';
import { setError } from '../actions/errorActions';
import { setSuccessMsg } from '../actions/successActions';
import * as types from '../constants/user';

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
    const userData = yield call(getAllUserData);
    const { data: { response = {} } = {} } = userData;
    yield put({ type: types.ALL_USERSDATA_SUCCESS, payload: response });
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

export default function* userRoot() {
  yield all([
    takeLatest(types.LOGGEDIN_USERDATA_REQUEST, getLoggedInUserData),
    takeLatest(types.ALL_USERSDATA_REQUEST, getAllValidUsersData),
    takeLatest(types.FOLLOW_USER_REQUEST, followUserRequest),
    takeLatest(types.UNFOLLOW_USER_REQUEST, unFollowUserRequest),
  ]);
}
