import initialState from '../initialState';
import * as types from '../constants/success';
export default function successReducer(state = initialState.success, action) {
  const { successMsg } = action;
  if (successMsg) {
    return {
      successMsg,
      isOpen: true,
    };
  } else if (action.type === types.HIDE_SUCCESS) {
    return {
      successMsg: null,
      isOpen: false,
    };
  }
  return state;
}
