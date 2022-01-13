import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import {
  createPost,
  fetchTimeLinePosts,
  likePost,
  unlikePost,
} from '../../apis/post';
import { setSuccessMsg } from '../actions/successActions';
import { setError } from '../actions/errorActions';
import { getLoggedInUser } from '../selectors/users';
import { getPostMetaData } from '../selectors/posts';
import * as types from '../constants/post';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* createPostOfUser({ payload }) {
  try {
    const userData = yield call(createPost, payload);
    const { data: { response = {} } = {} } = userData;
    const { userId = null } = response;
    if (userId) {
      response.userId = userId._id;
      response.userName = userId.username;
    }
    yield put({ type: types.CREATE_POST_SUCCESS, payload: response });
    yield put(setSuccessMsg('Post created successfully'));
  } catch (error) {
    yield put({ type: types.CREATE_POST_FAIL, payload: error.response.data });
  }
}

export function* getAllTimeLinePosts() {
  try {
    const metaData = yield select(getPostMetaData);
    const allPosts = yield call(fetchTimeLinePosts, metaData);
    let { data: { response: { data = [], pageNo, total } = {} } = {} } =
      allPosts;
    const { id: userId } = yield select(getLoggedInUser);
    //take the followed user data from here
    yield put({
      type: types.FETCH_TIMELINE_POST_SUCCESS,
      payload: {
        userId,
        result: data,
        metaData: {
          pageNo,
          total,
        },
      },
    });
  } catch (error) {
    yield put({
      type: types.FETCH_TIMELINE_POST_FAIL,
      payload: error.response.data,
    });
  }
}

export function* likeAPost({ id }) {
  try {
    yield call(likePost, id);
    const { id: userId } = yield select(getLoggedInUser);
    yield put({
      type: types.LIKE_POST_SUCCESS,
      payload: { id, userId },
    });
    yield put(setSuccessMsg('You like the post'));
  } catch (error) {
    yield put({
      type: types.LIKE_POST_FAIL,
      payload: error.response.data,
    });
    yield put(setError(error.response.data));
  }
}

export function* unLikeAPost({ id }) {
  try {
    yield call(unlikePost, id);
    const { id: userId } = yield select(getLoggedInUser);
    yield put({
      type: types.UNLIKE_POST_SUCCESS,
      payload: { id, userId },
    });
    yield put(setSuccessMsg('You unlike the post'));
  } catch (error) {
    yield put({
      type: types.UNLIKE_POST_FAIL,
      payload: error.response.data,
    });
  }
}

export default function* postRoot() {
  yield all([
    takeLatest(types.CREATE_POST_REQUEST, createPostOfUser),
    takeLatest(types.FETCH_TIMELINE_POST_REQUEST, getAllTimeLinePosts),
    takeLatest(types.LIKE_POST_REQUEST, likeAPost),
    takeLatest(types.UNLIKE_POST_REQUEST, unLikeAPost),
  ]);
}
