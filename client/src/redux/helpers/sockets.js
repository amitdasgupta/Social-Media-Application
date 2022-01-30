import { put, call, take, actionChannel, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { getAllSocketsIds } from '../selectors/sockets';
import * as types from '../constants/socket';

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
      console.log('user is not online');
      //need to store it in backend db and show them this when he opens website
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
