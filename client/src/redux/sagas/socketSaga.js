import { put, call, take, race, fork, delay, all } from 'redux-saga/effects';
import * as types from '../constants/socket';

import {
  connect,
  listenDisconnectSaga,
  listenConnectSaga,
  liveUserChannel,
  followRequestActionChannel,
  followNotificationChannel,
} from '../helpers/sockets';

//helpers methods

const listenDifferentChannels = function* (socketConnection) {
  yield all([
    fork(liveUserChannel, socketConnection),
    fork(followRequestActionChannel, socketConnection),
    fork(followNotificationChannel, socketConnection),
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
