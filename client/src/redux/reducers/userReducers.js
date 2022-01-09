import initialState from '../initialState';
import * as types from '../constants/user';
import difference from 'lodash/difference';

// Handles image related actions
export default function userReducer(
  state = initialState.user,
  { type, payload }
) {
  const { loggedInUser, appUsers = {}, followedUser, userSuggestion } = state;
  let userSuggestionList;
  switch (type) {
    case types.LOGGEDIN_USERDATA_SUCCESS:
      const { _id: userId, following } = payload;
      return {
        ...state,
        appUsers: { ...appUsers, [userId]: payload },
        loggedInUser: {
          isFetched: true,
          id: userId,
        },
        followedUser: {
          ...followedUser,
          data: following,
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
      userSuggestionList = difference(
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
    case types.FOLLOW_USER_SUCCESS: {
      const { userId: userFollowedId } = payload;
      const { data: followingUpdated = [] } = followedUser;
      const userFollowed = { ...appUsers[userFollowedId] };
      const { followersUpdated = [] } = userFollowed;
      if (followingUpdated.indexOf(userFollowedId) === -1) {
        followingUpdated.push(userFollowedId);
        followersUpdated.push(loggedInUser.id);
      }
      userSuggestionList = difference(Object.keys(appUsers), followingUpdated);
      return {
        ...state,
        followedUser: {
          ...followedUser,
          data: [...followingUpdated],
        },
        userSuggestion: {
          ...userSuggestion,
          data: userSuggestionList,
        },
        appUsers: {
          ...appUsers,
          [userFollowedId]: {
            ...userFollowed,
            followers: [...followersUpdated],
          },
        },
      };
    }

    case types.UNFOLLOW_USER_SUCCESS: {
      const { userId: userUnfollowedId } = payload;
      const { data: followingUpdated = [] } = followedUser;
      const userFollowed = { ...appUsers[userUnfollowedId] };
      const { followersUpdated = [] } = userFollowed;
      const indexOfUserFollow = followingUpdated.indexOf(userUnfollowedId);
      if (indexOfUserFollow !== -1) {
        followingUpdated.splice(indexOfUserFollow, 1);
        const index = followersUpdated.indexOf(loggedInUser.id);
        if (index !== -1) {
          followersUpdated.splice(index, 1);
        }
      }
      userSuggestionList = difference(Object.keys(appUsers), followingUpdated);
      return {
        ...state,
        followedUser: {
          ...followedUser,
          data: [...followingUpdated],
        },
        userSuggestion: {
          ...userSuggestion,
          data: userSuggestionList,
        },
        appUsers: {
          ...appUsers,
          [userUnfollowedId]: {
            ...userFollowed,
            followers: [...followersUpdated],
          },
        },
      };
    }

    default:
      return state;
  }
}
