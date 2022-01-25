import initialState from '../initialState';
import * as types from '../constants/socket';
export default function socketReducer(state = initialState.socket, action) {
  const { isSocketConnected, channels } = state;
  console.log(action.type);
  switch (action.type) {
    case types.CONNECT_SOCKET_SUCCESS:
      return { ...state, isSocketConnected: true };
    case types.DISCONNECT_SOCKET_SUCCESS:
      return { ...state, isSocketConnected: false };
    default:
      return state;
  }
}
