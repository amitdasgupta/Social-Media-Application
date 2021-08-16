import { put, call, takeLatest, all } from 'redux-saga/effects';
import { loginUser } from '../../apis/user';
import * as types from '../constants/user';
import { setToken, isAuthenticated } from '../../helpers/auth';

// Responsible for searching media library, making calls to the API
// and instructing the redux-saga middle ware on the next line of action,
// for success or failure operation.
export function* login({ payload }) {
  try {
    const userData = yield call(loginUser, payload);
    const { data: { response: { accessToken, ...remainingData } } = {} } =
      userData;
    setToken(accessToken);
    console.log(isAuthenticated());
    yield put({ type: types.USER_LOGIN_SUCCESS, remainingData });
  } catch (error) {
    console.log('error', error);
    yield put({ type: types.USER_LOGIN_ERROR, error });
  }
}

export default function* userRoot() {
  yield all([takeLatest(types.USER_LOGIN_REQUEST, login)]);
}
