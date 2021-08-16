import { fork, all } from 'redux-saga/effects';
import userSaga from './userSaga';

// Here, we register our watcher saga(s) and export as a single generator
// function (startForeman) as our root Saga.
export default function* watchAll() {
  yield all([fork(userSaga)]);
}
