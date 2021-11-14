import initialState from '../initialState';
import * as types from '../constants/user';
import difference from 'lodash/difference';

// Handles image related actions
export default function userReducer(
  state = initialState.user,
  { type, payload }
) {
  const { loggedInUser, appUsers = {}, followedUser, userSuggestion } = state;

  switch (type) {
    case types.LOGGEDIN_USERDATA_SUCCESS:
      const { _id: userId, followers } = payload;
      return {
        ...state,
        appUsers: { ...appUsers, [userId]: payload },
        loggedInUser: {
          isFetched: true,
          id: userId,
        },
        followedUser: {
          ...followedUser,
          data: followers,
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

    case types.ALL_USERSDATA_REQUEST:
      return {
        ...state,
        followedUser: {
          ...followedUser,
          isFetched: false,
        },
        userSuggestion: {
          ...userSuggestion,
          isFetched: false,
        },
      };

    case types.ALL_USERSDATA_SUCCESS:
      const updatedUsers = appUsers;
      for (let user of payload) {
        updatedUsers[user._id] = user;
      }

      const { data: followedUserList = [] } = followedUser;

      const userSuggestionList = difference(
        Object.keys(updatedUsers),
        followedUserList
      );
      return {
        ...state,
        followedUser: {
          ...followedUser,
          isFetched: true,
        },
        userSuggestion: {
          ...userSuggestion,
          isFetched: true,
          data: userSuggestionList,
        },
      };

    default:
      return state;
  }
}
