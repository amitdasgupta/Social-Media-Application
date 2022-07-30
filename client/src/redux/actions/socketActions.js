import * as types from '../constants/socket';

export const connectSocket = (socket) => ({
  type: types.SOCKET_CONNECT_REQUEST,
  socket,
});

export const getAllNotifications = () => ({
  type: types.FETCH_TIMELINE_NOTIFICATION_REQUEST,
});
