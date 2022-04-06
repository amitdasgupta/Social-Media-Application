import initialState from '../initialState';
import * as types from '../constants/socket';
export default function socketReducer(
  state = initialState.socket,
  { type, payload }
) {
  const { liveUsers, notifications } = state;
  switch (type) {
    case types.SOCKET_CONNECT_SUCCESS:
      return { ...state, isSocketConnected: true, socketExist: true };
    case types.SOCKET_DISCONNECT_SUCCESS:
      return { ...state, isSocketConnected: false, socketExist: true };
    case types.SOCKET_LIVE_USER_FETCHED:
      return {
        ...state,
        liveUsers: { ...liveUsers, isFetched: true, data: { ...payload } },
      };
    case types.SOCKET_FOLLOW_NOTIFICATION_UPDATE: {
      {
        const {
          data: { id, username },
        } = payload;
        const notificationData = {
          userId: id,
          userName: username,
          id,
          type: 'follow',
        };
        if (!notifications.data[id]) {
          return {
            ...state,
            notifications: {
              ...notifications,
              follow: [...notifications.follow],
              data: { ...notifications.data, [id]: notificationData },
            },
          };
        }
      }
      return state;
    }
    case types.SOCKET_USER_DICONNECT_UPDATE: {
      const {
        data: { id },
      } = payload;
      return {
        ...state,
        liveUsers: { ...liveUsers, data: { ...liveUsers.data, [id]: null } },
      };
    }
    case types.SOCKET_USER_JOIN_UPDATE: {
      const {
        data: { id, socketId },
      } = payload;
      return {
        ...state,
        liveUsers: {
          ...liveUsers,
          data: { ...liveUsers.data, [id]: socketId },
        },
      };
    }
    case types.SOCKET_POST_LIKE_NOTIFICATION_UPDATE: {
      const {
        data: {
          auth: { id: userId, username },
          postId,
        },
      } = payload;
      const id = `${userId}_${postId}`;
      const notificationData = {
        userId,
        userName: username,
        id,
        type: 'likePost',
      };
      const {
        notifications: { likePost = [] },
        data = {},
      } = state;
      if (!notifications.data[id]) {
        return {
          ...state,
          notifications: {
            ...notifications,
            likePost: [...likePost, id],
            data: {
              ...data,
              [id]: notificationData,
            },
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
}
