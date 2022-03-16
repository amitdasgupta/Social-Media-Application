import initialState from '../initialState';
import * as types from '../constants/comment';
// comments:{
//      postCommentDataMapping:{
//       postId:{
//         metaData: {
//           pageNo: 0,
//           size: 5,
//           total: 10,
//         },
//         comments:[]
//       }
//     },
//     data:{
//       commentId:{
//         "commentData"
//       }
//     },
//     reateComment: {
//       commentBeingCreated: false,
//     },
//   }
// };

// Handles image related actions

export default function commentReducer(
  state = initialState.comments,
  { type, payload = {} }
) {
  switch (type) {
    case types.CREATE_COMMENT_REQUEST:
      return {
        ...state,
        createComment: { commentBeingCreated: true },
      };
    case types.CREATE_COMMENT_SUCCESS:
      const { _id, postId } = payload;
      payload.id = _id;
      let { postCommentDataMapping, data } = state;
      if (postCommentDataMapping[postId]) {
        postCommentDataMapping = {
          ...postCommentDataMapping,
          [postId]: {
            ...postCommentDataMapping[postId],
            comments: [...postCommentDataMapping[postId]['comments'], _id],
          },
        };
      } else {
        postCommentDataMapping = {
          ...postCommentDataMapping,
          [postId]: {
            metaData: {
              pageNo: 0,
              size: 5,
              total: 10,
            },
            comments: [_id],
          },
        };
      }

      return {
        ...state,
        createComment: { commentBeingCreated: false },
        postCommentDataMapping,
        data: {
          ...data,
          [_id]: { ...payload },
        },
      };
    // case types.CREATE_POST_FAIL:
    //   return {
    //     ...state,
    //     createPost: {
    //       ...createPost,
    //       postBeingCreated: false,
    //       error: payload,
    //     },
    //   };
    // case types.FETCH_TIMELINE_POST_REQUEST:
    //   return {
    //     ...state,
    //     userPosts: {
    //       ...userPosts,
    //       isFetched: false,
    //     },
    //     timelinePosts: {
    //       ...timelinePosts,
    //       isFetched: false,
    //     },
    //     metaData: {
    //       ...metaData,
    //       pageNo: metaData.pageNo + 1,
    //     },
    //   };

    // case types.FETCH_TIMELINE_POST_SUCCESS:
    //   const [userPostsUpdated, timeLinePostUpdated, allPostsUpdated] =
    //     cleanTimeLinePosts(payload);
    //   return {
    //     ...state,
    //     userPosts: {
    //       data: [...userPosts.data, ...userPostsUpdated],
    //       isFetched: true,
    //     },
    //     timelinePosts: {
    //       data: [...timelinePosts.data, ...timeLinePostUpdated],
    //       isFetched: true,
    //     },
    //     allPostsData: {
    //       ...allPostsData,
    //       ...allPostsUpdated,
    //     },
    //     metaData: {
    //       ...metaData,
    //       ...payload.metaData,
    //     },
    //   };
    // case types.LIKE_POST_SUCCESS:
    //   if (!updatedPost.likes.includes(userId)) updatedPost.likes.push(userId);
    //   allPostsData[id] = updatedPost;
    //   return {
    //     ...state,
    //     allPostsData: {
    //       ...allPostsData,
    //     },
    //   };
    // case types.UNLIKE_POST_SUCCESS:
    //   if (updatedPost.likes.includes(userId)) {
    //     updatedPost.likes = pull(updatedPost.likes, userId);
    //   }
    //   allPostsData[id] = updatedPost;
    //   return {
    //     ...state,
    //     allPostsData: {
    //       ...allPostsData,
    //     },
    //   };

    default:
      return state;
  }
}
