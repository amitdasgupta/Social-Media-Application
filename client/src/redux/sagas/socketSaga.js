import {
  put,
  call,
  take,
  race,
  fork,
  delay,
  all,
  actionChannel,
  select,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as types from '../constants/socket';
import { getAllSocketsIds } from '../selectors/sockets';

//helpers methods
const connect = function* (socket) {
  yield put({ type: types.SOCKET_CONNECT_SUCCESS });
  yield new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const reconnect = (socket) => {
  return new Promise((resolve) => {
    socket.io.on('reconnect', () => {
      resolve(socket);
    });
  });
};

const disconnect = (socket) => {
  return new Promise((resolve) => {
    socket.on('disconnect', () => {
      resolve(socket);
    });
  });
};

const listenDisconnectSaga = function* (socketConnection) {
  while (true) {
    yield call(disconnect, socketConnection);
    yield put({ type: types.SOCKET_DISCONNECT_SUCCESS });
  }
};

const listenConnectSaga = function* (socketConnection) {
  while (true) {
    yield call(reconnect, socketConnection);
    yield put({ type: types.SOCKET_CONNECT_SUCCESS });
  }
};

// const getLiveUsers = function* (socketConnection) {
//   const payload = yield call(listenLiveUsers, socketConnection);
//   yield put({ type: types.SOCKET_LIVE_USER_FETCHED, payload });
// };

const createLiveUserChannel = (socket) =>
  eventChannel((emit) => {
    const handler = (data) => {
      emit(data);
      console.log('user data', data);
    };
    socket.on('users', handler);
    return () => {
      socket.off('users', handler);
    };
  });

function* liveUserChannel(socketConnection) {
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

function* followRequestActionChannel(socketConnection) {
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
      //need to store it in backend db and show them this when he opens website
    }
  }
}

const listenDifferentChannels = function* (socketConnection) {
  yield all([
    fork(liveUserChannel, socketConnection),
    fork(followRequestActionChannel, socketConnection),
  ]);
};

export function* listenSocketServer(socketConnection) {
  yield fork(listenDifferentChannels, socketConnection);
  const { timeout } = yield race({
    socket: call(connect, socketConnection),
    timeout: delay(2000),
  });
  if (timeout) {
    yield put({ type: types.SOCKET_DISCONNECT_SUCCESS });
  }
  yield fork(listenConnectSaga, socketConnection);
  yield fork(listenDisconnectSaga, socketConnection);
}

export default function* socketRoot() {
  while (1) {
    const { socket: socketConnection } = yield take(
      types.SOCKET_CONNECT_REQUEST
    );
    yield call(listenSocketServer, socketConnection);
  }
}
