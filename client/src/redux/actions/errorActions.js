import * as types from '../constants/error';

export function setError(error) {
  return {
    type: types.SET_ERROR,

    error: error,
  };
}

export function hideError() {
  return {
    type: types.HIDE_ERROR,
  };
}
