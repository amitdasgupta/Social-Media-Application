import { combineReducers } from 'redux';
import user from './userReducers';
import posts from './postReducers';
import comments from './commentReducer';
import success from './successReducer';
import error from './errorReducer';
import socket from './socketReducer';
// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  user,
  posts,
  success,
  error,
  socket,
  comments,
});

export default rootReducer;
