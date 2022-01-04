import * as types from '../constants/success';

export function setSuccessMsg(msg) {
  return {
    type: types.SET_SUCCESS,
    successMsg: msg,
  };
}

export function hideSuccessMsg() {
  return {
    type: types.HIDE_SUCCESS,
  };
}
