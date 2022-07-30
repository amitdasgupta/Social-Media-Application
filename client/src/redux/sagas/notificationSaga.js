import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { fetchAllNotifications } from '../../apis/notification';
import { getNotificationMetaData } from '../selectors/notification';
import * as types from '../constants/socket';
import { cleanNotification } from '../helpers/notifications';

export function* getAllNotifications() {
  try {
    const metaData = yield select(getNotificationMetaData);
    const allPosts = yield call(fetchAllNotifications, metaData);
    let { data: { response: { comment, follow, likePost } } = {} } = allPosts;
    const total = comment.total + follow.total + likePost.total;
    const followNotification = cleanNotification(follow.data);
    const commentNotification = cleanNotification(comment.data);
    const likePostNotification = cleanNotification(likePost.data);
    yield put({
      type: types.FETCH_TIMELINE_NOTIFICATION_SUCCESS,
      payload: {
        follow: followNotification,
        comment: commentNotification,
        likePost: likePostNotification,
        metaData: {
          ...metaData,
          total: total,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export default function* notificationRoot() {
  yield all([
    takeLatest(types.FETCH_TIMELINE_NOTIFICATION_REQUEST, getAllNotifications),
  ]);
}
