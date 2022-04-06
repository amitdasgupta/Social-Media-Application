import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import {
  createComment,
  fetchPostComments,
  toggleLikeComment,
} from '../../apis/comment';
import { getLoggedInUser } from '../selectors/users';
import { setSuccessMsg } from '../actions/successActions';
import { setError } from '../actions/errorActions';
import { getCommentMetaData } from '../selectors/comments';
import * as types from '../constants/comment';

export function* createCommentOfUser({ payload }) {
  try {
    const userData = yield call(createComment, payload);
    const { data: { response = {} } = {} } = userData;
    const { userId = null } = response;
    if (userId) {
      response.userId = userId._id;
      response.userName = userId.username;
      response.profilepic = userId.profilepic;
    }
    yield put({ type: types.CREATE_COMMENT_SUCCESS, payload: response });
    yield put(setSuccessMsg('Comment Posted'));
  } catch (error) {
    yield put({
      type: types.CREATE_COMMENT_SUCCESS,
      payload: error.response.data,
    });
  }
}

export function* getPostAllComments({ payload: { postId } }) {
  try {
    const metaData = yield select(getCommentMetaData, postId);
    const allComments = yield call(fetchPostComments, { ...metaData, postId });
    let { data: { response: { data = [], total } = {} } = {} } = allComments;
    //take the followed user data from here
    yield put({
      type: types.FETCH_POST_COMMENTS_SUCCESS,
      payload: {
        result: data,
        metaData: {
          ...metaData,
          total: total,
        },
        postId,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export function* toggleLikeAComment({ id, isCommentLiked }) {
  try {
    yield call(toggleLikeComment, id);
    const { id: userId } = yield select(getLoggedInUser);
    yield put({
      type: types.TOGGLE_LIKE_COMMENT_SUCCESS,
      payload: { id, userId },
    });
    if (isCommentLiked) yield put(setSuccessMsg('You unliked the comment'));
    else yield put(setSuccessMsg('You liked the comment'));
  } catch (error) {
    yield put(setError('Like comment failed'));
  }
}

export default function* commentRoot() {
  yield all([
    takeLatest(types.CREATE_COMMENT_REQUEST, createCommentOfUser),
    takeLatest(types.FETCH_POST_COMMENTS_REQUEST, getPostAllComments),
    takeLatest(types.TOGGLE_LIKE_COMMENT_REQUEST, toggleLikeAComment),
  ]);
}
