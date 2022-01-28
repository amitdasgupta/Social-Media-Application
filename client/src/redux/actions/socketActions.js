import * as types from '../constants/socket';

export const connectSocket = (socket) => ({
  type: types.SOCKET_CONNECT_REQUEST,
  socket,
});
