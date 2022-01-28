import {
  put,
  call,
  take,
  race,
  fork,
  delay,
  cancelled,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as types from '../constants/socket';
import { setError } from '../actions/errorActions';

//helpers methods
const connect = function* (socket) {
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

const listenLiveUsers = (socket) => {
  return new Promise((resolve) => {
    socket.on('users', (data) => {
      resolve(data);
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

const getLiveUsers = function* (socketConnection) {
  const payload = yield call(listenLiveUsers, socketConnection);
  yield put({ type: types.SOCKET_LIVE_USER_FETCHED, payload });
};

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

export function* listenSocketServer(socketConnection) {
  // connect to the server
  yield fork(getLiveUsers, socketConnection);
  const { timeout } = yield race({
    socket: call(connect, socketConnection),
    timeout: delay(2000),
  });
  if (timeout) {
    yield put({ type: types.SOCKET_DISCONNECT_SUCCESS });
  }
  yield put({ type: types.SOCKET_CONNECT_SUCCESS });
  // then create a socket channel
  //create channel
  const liveUserChannel = yield call(createLiveUserChannel, socketConnection);
  yield fork(listenConnectSaga, socketConnection);
  yield fork(listenDisconnectSaga, socketConnection);
  // yield fork(listenErrorSaga, socketConnection);
  const payload = yield take(liveUserChannel);
  yield put({ type: types.SOCKET_LIVE_USER_FETCHED, payload });
  // then put the new data into the reducer
  while (true) {
    //use channel here
    const payload = yield take(liveUserChannel);
    yield put({ type: types.SOCKET_LIVE_USER_FETCHED, payload });
  }
}

export default function* socketRoot() {
  while (1) {
    const { socket: socketConnection } = yield take(
      types.SOCKET_CONNECT_REQUEST
    );
    yield call(listenSocketServer, socketConnection);
  }
}
