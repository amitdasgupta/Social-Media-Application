import {
  put,
  call,
  takeLatest,
  all,
  select,
  takeEvery,
} from 'redux-saga/effects';
import {
  createPost,
  fetchTimeLinePosts,
  likePost,
  unlikePost,
} from '../../apis/post';
import { getLoggedInUser } from '../selectors/users';
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
  } catch (error) {
    yield put({ type: types.CREATE_POST_FAIL, payload: error.response.data });
  }
}

export function* getAllTimeLinePosts() {
  try {
    const allPosts = yield call(fetchTimeLinePosts);
    let { data: { response = {} } = {} } = allPosts;
    const { id: userId } = yield select(getLoggedInUser);

    //take the followed user data from here
    const followedUserData = [];
    response = response.map((post) => {
      const { userId = null, _id } = post;
      if (userId) {
        followedUserData.push(userId);
        post.userId = userId._id;
        post.userName = userId.username;
      }
      post.id = _id;
      return post;
    });
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

export function* likeAPost({ id }) {
  try {
    yield call(likePost, id);
    const { id: userId } = yield select(getLoggedInUser);
    yield put({
      type: types.LIKE_POST_SUCCESS,
      payload: { id, userId },
    });
  } catch (error) {
    yield put({
      type: types.LIKE_POST_FAIL,
      payload: error.response.data,
    });
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
