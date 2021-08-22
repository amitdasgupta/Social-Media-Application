import initialState from '../initialState';
import * as types from '../constants/post';

//initial state
// posts: {
// createPost: {
//   postBeingCreated: false,
//   error: null,
// },
//   userPosts: {
//     isFetched: false,
//     data: [],
//   },
//   followPosts: {
//     isFetched: false,
//     data: [],
//   },
//   allPostsData: {},
// },

// Handles image related actions
export default function userReducer(
  state = initialState.posts,
  { type, payload }
) {
  const { userPosts, allPostsData, createPost } = state;
  switch (type) {
    case types.CREATE_POST_REQUEST:
      return {
        ...state,
        createPost: { ...createPost, postBeingCreated: true },
      };
    case types.CREATE_POST_SUCCESS:
      const { _id } = payload;
      const updatedPosts = { ...allPostsData, _id: payload };
      const userPostsData = [...userPosts.data, _id];
      return {
        ...state,
        userPosts: { ...userPosts, isFetched: true, data: userPostsData },
        allPostsData: updatedPosts,
        createPost: { postBeingCreated: false, error: null },
      };
    case types.CREATE_POST_FAIL:
      return {
        ...state,
        createPost: {
          ...createPost,
          postBeingCreated: false,
          error: payload,
        },
      };
    default:
      return state;
  }
}
