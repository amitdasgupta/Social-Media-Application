import { combineReducers } from 'redux';
import user from './userReducers';
import posts from './postReducers';

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  user,
  posts,
});

export default rootReducer;
