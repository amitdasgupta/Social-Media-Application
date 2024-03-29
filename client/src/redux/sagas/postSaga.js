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
import { setSuccessMsg } from '../actions/successActions';
import { setError } from '../actions/errorActions';
import { getLoggedInUser } from '../selectors/users';
import { getPostMetaData, getPostData } from '../selectors/posts';
import * as types from '../constants/post';
import * as socketTypes from '../constants/socket';

export function* createPostOfUser({ payload }) {
  try {
    const userData = yield call(createPost, payload);
    const { data: { response = {} } = {} } = userData;
    const { userId = null } = response;
    if (userId) {
      response.userId = userId._id;
      response.userName = userId.username;
      response.profilepic = userId.profilepic;
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
    let { data: { response: { data = [], total } = {} } = {} } = allPosts;
    const { id: userId } = yield select(getLoggedInUser);
    //take the followed user data from here
    yield put({
      type: types.FETCH_TIMELINE_POST_SUCCESS,
      payload: {
        userId,
        result: data,
        metaData: {
          ...metaData,
          total: total,
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
    const { postOwnerId, desc, image } = yield select(getPostData, id);
    yield put({
      type: socketTypes.SOCKET_POST_LIKE_REQUEST_UPDATE,
      payload: { id, postOwnerId, desc, image },
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
    takeEvery(types.FETCH_TIMELINE_POST_REQUEST, getAllTimeLinePosts),
    takeEvery(types.LIKE_POST_REQUEST, likeAPost),
    takeEvery(types.UNLIKE_POST_REQUEST, unLikeAPost),
  ]);
}
