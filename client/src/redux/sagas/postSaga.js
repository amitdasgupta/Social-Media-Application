import { put, call, takeLatest, all } from 'redux-saga/effects';
import { createPost } from '../../apis/post';
import * as types from '../constants/post';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* createPostOfUser({ action, payload }) {
  try {
    // console.log(postData);
    // return;
    console.log('reached here');
    const userData = yield call(createPost, payload);
    const { data: { response = {} } = {} } = userData;
    yield put({ type: types.CREATE_POST_SUCCESS, payload: response });
  } catch (error) {
    console.log('error', error);
    yield put({ type: types.CREATE_POST_FAIL, error });
  }
}

export default function* postRoot() {
  yield all([takeLatest(types.CREATE_POST_REQUEST, createPostOfUser)]);
}