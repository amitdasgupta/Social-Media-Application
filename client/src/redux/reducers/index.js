import { combineReducers } from 'redux';
import user from './userReducers';
import posts from './postReducers';
import success from './successReducer';
import error from './errorReducer';

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  user,
  posts,
  success,
  error,
});

export default rootReducer;
