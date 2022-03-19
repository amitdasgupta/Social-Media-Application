import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import {
  createComment,
  fetchPostComments,
  likePost,
  unlikePost,
} from '../../apis/comment';
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

// export function* likeAPost({ id }) {
//   try {
//     yield call(likePost, id);
//     const { id: userId } = yield select(getLoggedInUser);
//     yield put({
//       type: types.LIKE_POST_SUCCESS,
//       payload: { id, userId },
//     });
//     yield put(setSuccessMsg('You like the post'));
//   } catch (error) {
//     yield put({
//       type: types.LIKE_POST_FAIL,
//       payload: error.response.data,
//     });
//     yield put(setError(error.response.data));
//   }
// }

// export function* unLikeAPost({ id }) {
//   try {
//     yield call(unlikePost, id);
//     const { id: userId } = yield select(getLoggedInUser);
//     yield put({
//       type: types.UNLIKE_POST_SUCCESS,
//       payload: { id, userId },
//     });
//     yield put(setSuccessMsg('You unlike the post'));
//   } catch (error) {
//     yield put({
//       type: types.UNLIKE_POST_FAIL,
//       payload: error.response.data,
//     });
//   }
// }

export default function* commentRoot() {
  yield all([
    takeLatest(types.CREATE_COMMENT_REQUEST, createCommentOfUser),
    takeLatest(types.FETCH_POST_COMMENTS_REQUEST, getPostAllComments),
    // takeLatest(types.LIKE_POST_REQUEST, likeAPost),
    // takeLatest(types.UNLIKE_POST_REQUEST, unLikeAPost),
  ]);
}
