import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { createPost, fetchTimeLinePosts } from '../../apis/post';
import { getLoggedInUser } from '../selectors/users';
import * as types from '../constants/post';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* createPostOfUser({ payload }) {
  try {
    const userData = yield call(createPost, payload);
    const { data: { response = {} } = {} } = userData;
    yield put({ type: types.CREATE_POST_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: types.CREATE_POST_FAIL, payload: error.response.data });
  }
}

export function* getAllTimeLinePosts() {
  try {
    const allPosts = yield call(fetchTimeLinePosts);
    const { data: { response = {} } = {} } = allPosts;
    const { id: userId } = yield select(getLoggedInUser);
    yield put({
      type: types.FETCH_TIMELINE_POST_SUCCESS,
      payload: { userId, result: response },
    });
  } catch (error) {
    yield put({
      type: types.FETCH_TIMELINE_POST_FAIL,
      payload: error.response.data,
    });
  }
}

export default function* postRoot() {
  yield all([
    takeLatest(types.CREATE_POST_REQUEST, createPostOfUser),
    takeLatest(types.FETCH_TIMELINE_POST_REQUEST, getAllTimeLinePosts),
  ]);
}
