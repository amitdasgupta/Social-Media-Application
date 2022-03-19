import initialState from '../initialState';
import * as types from '../constants/comment';

// comments:{
//    postCommentDataMapping:{
//   postId:{
// metaData: {
//   pageNo: 0,
//   size: 5,
//   total: 10,
// },
//     commentsIds:[],
//     isFetched: true,
//   }
// },
//   data:{
//     commentId:{
//       "commentData"
//     }
//   },
//   reateComment: {
//     commentBeingCreated: false,
//   },
// }

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
    case types.CREATE_COMMENT_SUCCESS: {
      const { _id, postId } = payload;
      payload.id = _id;
      let { postCommentDataMapping, commentsData } = state;
      if (postCommentDataMapping[postId]) {
        postCommentDataMapping = {
          ...postCommentDataMapping,
          [postId]: {
            ...postCommentDataMapping[postId],
            commentsIds: [
              _id,
              ...postCommentDataMapping[postId]['commentsIds'],
            ],
          },
        };
      } else {
        postCommentDataMapping = {
          ...postCommentDataMapping,
          [postId]: {
            metaData: {
              pageNo: 0,
              size: 10,
              total: 0,
            },
            commentsIds: [_id],
          },
        };
      }

      return {
        ...state,
        createComment: { commentBeingCreated: false },
        postCommentDataMapping,
        commentsData: {
          ...commentsData,
          [_id]: { ...payload },
        },
      };
    }
    // case types.CREATE_POST_FAIL:
    //   return {
    //     ...state,
    //     createPost: {
    //       ...createPost,
    //       postBeingCreated: false,
    //       error: payload,
    //     },
    //   };
    case types.FETCH_POST_COMMENTS_REQUEST: {
      const { postId } = payload;
      const { postCommentDataMapping } = state;
      const commentData = postCommentDataMapping[postId] || {
        metaData: { pageNo: 0, size: 10, total: 0 },
        commentsIds: [],
        isFetched: false,
      };
      const { metaData } = commentData;
      const updatedMetaData = { ...metaData, pageNo: metaData.pageNo + 1 };
      return {
        ...state,
        postCommentDataMapping: {
          ...postCommentDataMapping,
          [postId]: {
            ...commentData,
            metaData: updatedMetaData,
            isFetched: false,
          },
        },
      };
    }
    case types.FETCH_POST_COMMENTS_SUCCESS: {
      const { postId, metaData, result = [] } = payload;
      const { postCommentDataMapping, commentsData } = state;
      const commentData = postCommentDataMapping[postId] || {
        metaData: { pageNo: 0, size: 10, total: 0 },
        commentsIds: [],
        isFetched: true,
      };
      const commentsAdded = [];
      for (let index = 0; index < result.length; index++) {
        const data = result[index];
        const { _id } = data;
        commentsData[_id] = data;
        commentsAdded.push(_id);
      }
      return {
        ...state,
        postCommentDataMapping: {
          ...postCommentDataMapping,
          [postId]: {
            ...commentData,
            metaData,
            commentsIds: [...commentData.commentsIds, ...commentsAdded],
            isFetched: true,
          },
        },
        commentsData: {
          ...commentsData,
        },
      };
    }
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
