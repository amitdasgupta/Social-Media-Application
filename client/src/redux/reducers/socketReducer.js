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
            data: { ...notifications.data, id: notificationData },
          },
        };
      }
    }
    default:
      return state;
  }
}
