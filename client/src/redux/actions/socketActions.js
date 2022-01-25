import * as types from '../constants/socket';

export const connectSocket = (socket) => ({
  type: types.CONNECT_SOCKET_REQUEST,
  socket,
});
