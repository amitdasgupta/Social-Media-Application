import initialState from '../initialState';
import * as types from '../constants/user';

// Handles image related actions
export default function userReducer(
  state = initialState.user,
  { type, payload }
) {
  const { loggedInUser, appUsers = {} } = state;
  switch (type) {
    case types.LOGGEDIN_USERDATA_SUCCESS:
      const { _id: userId } = payload;
      return {
        ...state,
        appUsers: { ...appUsers, [userId]: payload },
        loggedInUser: {
          isFetched: true,
          id: userId,
        },
      };

    case types.LOGGEDIN_USERDATA_REQUEST:
      return {
        ...state,
        loggedInUser: {
          ...loggedInUser,
          isFetched: false,
        },
      };

    default:
      return state;
  }
}
