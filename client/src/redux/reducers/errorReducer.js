import initialState from '../initialState';
import * as types from '../constants/error';
export default function errorReducer(state = initialState.error, action) {
  const { error } = action;

  if (error) {
    return {
      errorMsg: error,

      isOpen: true,
    };
  } else if (action.type === types.HIDE_ERROR) {
    return {
      errorMsg: null,
      isOpen: false,
    };
  }

  return state;
}
