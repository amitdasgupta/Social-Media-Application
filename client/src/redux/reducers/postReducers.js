import initialState from '../initialState';
import * as types from '../constants/post';

// Handles image related actions
export default function userReducer(
  state = initialState.posts,
  { type, payload }
) {
  switch (type) {
    default:
      return state;
  }
}
