import { fork, all } from 'redux-saga/effects';
import userSaga from './userSaga';
import postSaga from './postSaga';
import socketSaga from './socketSaga';
import commentSaga from './commentSaga';

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* watchAll() {
  yield all([
    fork(userSaga),
    fork(postSaga),
    fork(socketSaga),
    fork(commentSaga),
  ]);
}
