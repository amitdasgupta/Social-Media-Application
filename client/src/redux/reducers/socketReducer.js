import initialState from '../initialState';
import * as types from '../constants/socket';
export default function socketReducer(
  state = initialState.socket,
  { type, payload }
) {
  const { channels, liveUsers } = state;
  switch (type) {
    case types.SOCKET_CONNECT_SUCCESS:
      return { ...state, isSocketConnected: true, socketExist: true };
    case types.SOCKET_DISCONNECT_SUCCESS:
      return { ...state, isSocketConnected: false, socketExist: true };
    case types.SOCKET_LIVE_USER_FETCHED:
      return { ...state, liveUsers: [...payload] };
    default:
      return state;
  }
}
