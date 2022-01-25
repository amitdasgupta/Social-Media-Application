import { put, call, take, delay, race, fork } from 'redux-saga/effects';
import * as types from '../constants/socket';
import { setError } from '../actions/errorActions';

//helpers methods
const connect = (socket) => {
  return new Promise((resolve) => {
    socket.on('connect', () => {
      console.log(socket.id);
      resolve(socket);
    });
  });
};

const reconnect = (socket) => {
  return new Promise((resolve) => {
    socket.on('reconnect', () => {
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
    yield put({ type: types.DISCONNECT_SOCKET_SUCCESS });
  }
};

const listenConnectSaga = function* (socketConnection) {
  while (true) {
    yield call(reconnect, socketConnection);
    yield put({ type: types.CONNECT_SOCKET_SUCCESS });
  }
};

export function* listenSocketServer(socketConnection) {
  try {
    // connect to the server
    const { socket, timeout } = yield race({
      socket: call(connect, socketConnection),
      timeout: delay(2000),
    });
    if (timeout) {
      yield put({ type: types.DISCONNECT_SOCKET_SUCCESS });
    }
    yield put({ type: types.CONNECT_SOCKET_SUCCESS });
    // then create a socket channel
    //create channel
    // const socketChannel = yield call(createSocketChannel, socket);
    yield fork(listenDisconnectSaga, socketConnection);
    yield fork(listenConnectSaga, socketConnection);
    // then put the new data into the reducer
    // while (true) {
    //   //use channel here
    //   //  const payload = yield take(socketChannel);
    //   //  yield put({type: ADD_TASK, payload});
    // }
  } catch (error) {
    yield put({ type: types.DISCONNECT_SOCKET_SUCCESS });
    yield put(setError(error.response.data));
  }
}

export default function* socketRoot() {
  while (1) {
    const { socket: socketConnection } = yield take(
      types.CONNECT_SOCKET_REQUEST
    );
    yield race({
      task: call(listenSocketServer, socketConnection),
      cancel: take(types.DISCONNECT_SOCKET_SUCCESS),
    });
  }
}
