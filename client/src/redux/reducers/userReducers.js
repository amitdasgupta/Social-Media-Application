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
        metaData: {
          ...state.metaData,
          pageNo: state.metaData.pageNo + 1,
        },
      };

    case types.ALL_USERSDATA_SUCCESS: {
      const updatedUsers = appUsers;
      const { result: allUserData, metaData } = payload;
      for (let user of allUserData) {
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
        metaData: {
          ...state.metaData,
          ...metaData,
        },
      };
    }
    case types.FOLLOW_USER_SUCCESS: {
      const { userId: userFollowedId } = payload;
      const { data: followingUpdated = [] } = followedUser;
      const userFollowed = { ...appUsers[userFollowedId] };
      const { followers: followersUpdated = [] } = userFollowed;
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
      const { followers: followersUpdated = [] } = userFollowed;
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
    case types.UPDATE_USER_REQUEST: {
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          isUpdating: true,
        },
      };
    }
    case types.UPDATE_USER_SUCCESS: {
      const { userData } = payload;
      const {
        loggedInUser: { id },
      } = state;
      return {
        ...state,
        appUsers: { ...state.appUsers, [id]: userData },
        loggedInUser: {
          ...state.loggedInUser,
          isUpdating: false,
        },
      };
    }

    // case types.SINGLE_USER_DATA_REQUEST: {
    //   const { appUsers } = state;
    //   const { userId } = payload;
    //   return {
    //     ...state,
    //     appUsers: {
    //       ...appUsers,
    //       [userId]: 'fetching',
    //     },
    //   };
    // }

    case types.SINGLE_USER_DATA_SUCCESS: {
      const { userData } = payload;
      const { _id } = userData;
      const { appUsers } = state;
      return {
        ...state,
        appUsers: {
          ...appUsers,
          [_id]: userData,
        },
      };
    }
    default:
      return state;
  }
}
