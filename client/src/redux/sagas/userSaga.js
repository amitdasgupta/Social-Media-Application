import { put, call, takeLatest, all } from 'redux-saga/effects';
import { getAuthUserData } from '../../apis/user';
import * as types from '../constants/user';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* getLoggedInUserData() {
  try {
    const userData = yield call(getAuthUserData);
    const { data: { response = {} } = {} } = userData;
    yield put({ type: types.LOGGEDIN_USERDATA_SUCCESS, payload: response });
  } catch (error) {
    console.log('error', error);
    yield put({ type: types.LOGGEDIN_USERDATA_FAIL, error });
  }
}

export default function* userRoot() {
  yield all([takeLatest(types.LOGGEDIN_USERDATA_REQUEST, getLoggedInUserData)]);
}
