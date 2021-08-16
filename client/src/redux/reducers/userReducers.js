import initialState from '../initialState';
import * as types from '../constants/user';

// Handles image related actions
export default function userReducer(
  state = initialState.user,
  { type, payload }
) {
  switch (type) {
    case types.LOGGEDIN_USERDATA_SUCCESS:
      return { ...state, loggedInUser: payload };
    default:
      return state;
  }
}
