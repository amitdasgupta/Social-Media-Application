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

function cleanTimeLinePosts(payload) {
  const userPosts = [];
  const followPosts = [];
  const allPosts = {};
  const { userId = '', result = [] } = payload;
  for (let index = 0; index < result.length; index++) {
    const post = result[index];
    const { _id: postId } = post;
    if (post.userId === userId) {
      userPosts.push(postId);
    } else {
      followPosts.push(postId);
    }
    allPosts[postId] = post;
  }
  return [userPosts, followPosts, allPosts];
}

export default function userReducer(
  state = initialState.posts,
  { type, payload }
) {
  const { userPosts, allPostsData, createPost, followPosts } = state;
  switch (type) {
    case types.CREATE_POST_REQUEST:
      return {
        ...state,
        createPost: { ...createPost, postBeingCreated: true },
      };
    case types.CREATE_POST_SUCCESS:
      const { _id } = payload;
      const updatedPosts = { ...allPostsData, [_id]: payload };
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
    case types.FETCH_TIMELINE_POST_REQUEST:
      return {
        ...state,
        userPosts: {
          ...userPosts,
          isFetched: false,
        },
        followPosts: {
          ...followPosts,
          isFetched: false,
        },
      };

    case types.FETCH_TIMELINE_POST_SUCCESS:
      const [userPostsUpdated, followPostsUpdated, allPostsUpdated] =
        cleanTimeLinePosts(payload);
      // console.log(userPostsUpdated);
      // return state;
      return {
        ...state,
        userPosts: {
          data: [...userPostsUpdated],
          isFetched: true,
        },
        followPosts: {
          data: [...followPostsUpdated],
          isFetched: true,
        },
        allPostsData: {
          ...allPostsUpdated,
        },
      };
    default:
      return state;
  }
}
