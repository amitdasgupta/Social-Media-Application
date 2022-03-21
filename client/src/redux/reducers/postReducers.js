import initialState from '../initialState';
import * as types from '../constants/post';
import * as commentTypes from '../constants/comment';
import { pull } from 'lodash';

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
//   timelinePosts: {
//     isFetched: false,
//     data: [],
//   },
//   allPostsData: {},
//   metaData:{
//   pageNo: 1
// total: 5
// }
// },

// Handles image related actions

function cleanTimeLinePosts(payload) {
  const userPosts = [];
  const timelinePosts = [];
  const allPosts = {};
  const { userId = '', result = [] } = payload;
  for (let index = 0; index < result.length; index++) {
    const post = result[index];
    const { _id: postId } = post;
    if (post.userId === userId) {
      userPosts.push(postId);
    }
    timelinePosts.push(postId);
    allPosts[postId] = post;
  }
  return [userPosts, timelinePosts, allPosts];
}

export default function postReducer(
  state = initialState.posts,
  { type, payload = {} }
) {
  const { userPosts, allPostsData, createPost, timelinePosts, metaData } =
    state;
  let updatedPost = {};
  //postId  and user Id
  const { id, userId } = payload;
  if (id) {
    updatedPost = { ...allPostsData[id] };
  }
  switch (type) {
    case types.CREATE_POST_REQUEST:
      return {
        ...state,
        createPost: { ...createPost, postBeingCreated: true },
      };
    case types.CREATE_POST_SUCCESS:
      const { _id } = payload;
      payload.id = _id;
      const updatedPosts = { ...allPostsData, [_id]: payload };
      const userPostsData = [...userPosts.data, _id];
      return {
        ...state,
        userPosts: { ...userPosts, isFetched: true, data: userPostsData },
        allPostsData: updatedPosts,
        createPost: { postBeingCreated: false, error: null },
        timelinePosts: {
          ...timelinePosts,
          data: [_id, ...timelinePosts.data],
        },
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
        timelinePosts: {
          ...timelinePosts,
          isFetched: false,
        },
        metaData: {
          ...metaData,
          pageNo: metaData.pageNo + 1,
        },
      };

    case types.FETCH_TIMELINE_POST_SUCCESS:
      const [userPostsUpdated, timeLinePostUpdated, allPostsUpdated] =
        cleanTimeLinePosts(payload);
      return {
        ...state,
        userPosts: {
          data: [...userPosts.data, ...userPostsUpdated],
          isFetched: true,
        },
        timelinePosts: {
          data: [...timelinePosts.data, ...timeLinePostUpdated],
          isFetched: true,
        },
        allPostsData: {
          ...allPostsData,
          ...allPostsUpdated,
        },
        metaData: {
          ...metaData,
          ...payload.metaData,
        },
      };
    case types.LIKE_POST_SUCCESS:
      if (!updatedPost.likes.includes(userId)) updatedPost.likes.push(userId);
      allPostsData[id] = updatedPost;
      return {
        ...state,
        allPostsData: {
          ...allPostsData,
        },
      };
    case types.UNLIKE_POST_SUCCESS:
      if (updatedPost.likes.includes(userId)) {
        updatedPost.likes = pull(updatedPost.likes, userId);
      }
      allPostsData[id] = updatedPost;
      return {
        ...state,
        allPostsData: {
          ...allPostsData,
        },
      };

    case commentTypes.CREATE_COMMENT_SUCCESS: {
      const { postId } = payload;
      const { allPostsData } = state;
      const postData = allPostsData[postId];
      return {
        ...state,
        allPostsData: {
          ...allPostsData,
          [postId]: {
            ...postData,
            comments: postData.comments + 1,
          },
        },
      };
    }

    default:
      return state;
  }
}
