import { put, call, take, actionChannel, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { getAllSocketsIds } from '../selectors/sockets';
import * as types from '../constants/socket';
import { saveNotification } from '../../apis/notification';

//basic
export const connect = function* (socket) {
  yield put({ type: types.SOCKET_CONNECT_SUCCESS });
  yield new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

export const reconnect = (socket) => {
  return new Promise((resolve) => {
    socket.io.on('reconnect', () => {
      resolve(socket);
    });
  });
};

export const disconnect = (socket) => {
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

//sagas
export const listenDisconnectSaga = function* (socketConnection) {
  while (true) {
    yield call(disconnect, socketConnection);
    yield put({ type: types.SOCKET_DISCONNECT_SUCCESS });
  }
};

export const listenConnectSaga = function* (socketConnection) {
  while (true) {
    yield call(reconnect, socketConnection);
    yield put({ type: types.SOCKET_CONNECT_SUCCESS });
  }
};

//channels
const createLiveUserChannel = (socket) =>
  eventChannel((emit) => {
    const handler = (data) => {
      emit(data);
    };
    socket.on('users', handler);
    return () => {
      socket.off('users', handler);
    };
  });

export function* liveUserChannel(socketConnection) {
  const liveUserChannel = yield call(createLiveUserChannel, socketConnection);
  try {
    while (true) {
      const payload = yield take(liveUserChannel);
      yield put({ type: types.SOCKET_LIVE_USER_FETCHED, payload });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* followRequestActionChannel(socketConnection) {
  const followRequestsChannel = yield actionChannel(
    types.SOCKET_FOLLOW_REQUESTS_UPDATE
  );

  while (1) {
    const { payload: { userId } = {} } = yield take(followRequestsChannel);
    const allSocketIds = yield select(getAllSocketsIds);
    const userFollowedSocketId = allSocketIds[userId];
    if (userFollowedSocketId) {
      socketConnection.emit('userFollowed', userFollowedSocketId);
    } else {
      // yield fork for notificationData save in DB
      yield fork(saveNotification, {
        notifiedUser: userId,
        type: 'follow',
      });
    }
  }
}

const createFollowNotificationChannel = (socket) =>
  eventChannel((emit) => {
    const handler = (data) => {
      emit(data);
    };
    socket.on('followNotification', handler);
    return () => {
      socket.off('followNotification', handler);
    };
  });

export function* followNotificationChannel(socketConnection) {
  const followChannel = yield call(
    createFollowNotificationChannel,
    socketConnection
  );
  try {
    while (true) {
      const payload = yield take(followChannel);
      yield put({ type: types.SOCKET_FOLLOW_NOTIFICATION_UPDATE, payload });
    }
  } catch (error) {
    console.log(error);
  }
}

const createDisconnectUserChannel = (socket) =>
  eventChannel((emit) => {
    const handler = (data) => {
      emit(data);
    };
    socket.on('userDisconnected', handler);
    return () => {
      socket.off('userDisconnected', handler);
    };
  });

export function* disconnectUserChannel(socketConnection) {
  const disconnetChannel = yield call(
    createDisconnectUserChannel,
    socketConnection
  );
  try {
    while (true) {
      const payload = yield take(disconnetChannel);
      yield put({ type: types.SOCKET_USER_DICONNECT_UPDATE, payload });
    }
  } catch (error) {
    console.log(error);
  }
}

const createJoinedUserChannel = (socket) =>
  eventChannel((emit) => {
    const handler = (data) => {
      emit(data);
    };
    socket.on('userJoined', handler);
    return () => {
      socket.off('userJoined', handler);
    };
  });

export function* joinedUserChannel(socketConnection) {
  const joinedChannel = yield call(createJoinedUserChannel, socketConnection);
  try {
    while (true) {
      const payload = yield take(joinedChannel);
      yield put({ type: types.SOCKET_USER_JOIN_UPDATE, payload });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* likePostActionChannel(socketConnection) {
  const postLikedRequestChannel = yield actionChannel(
    types.SOCKET_POST_LIKE_REQUEST_UPDATE
  );

  while (1) {
    const { payload: { postOwnerId, id: postId, desc, image } = {} } =
      yield take(postLikedRequestChannel);
    const allSocketIds = yield select(getAllSocketsIds);
    const userSocketId = allSocketIds[postOwnerId];
    if (userSocketId) {
      socketConnection.emit('postLiked', { userSocketId, postId, desc, image });
    } else {
      // yield fork for notificationData save in DB
      yield fork(saveNotification, {
        notifiedUser: postOwnerId,
        postId,
        desc,
        image,
        type: 'likePost',
      });
    }
  }
}

const createPostLikedNotificationChannel = (socket) =>
  eventChannel((emit) => {
    const handler = (data) => {
      emit(data);
    };
    socket.on('postLikedNotification', handler);
    return () => {
      socket.off('postLikedNotification', handler);
    };
  });

export function* postLikeNotificationChannel(socketConnection) {
  const postLikedChannel = yield call(
    createPostLikedNotificationChannel,
    socketConnection
  );
  try {
    while (true) {
      const payload = yield take(postLikedChannel);
      yield put({ type: types.SOCKET_POST_LIKE_NOTIFICATION_UPDATE, payload });
    }
  } catch (error) {
    console.log(error);
  }
}
