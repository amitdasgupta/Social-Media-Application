const initialState = {
  user: {
    loggedInUser: {
      isFetched: false,
      id: null,
      isUpdating: false,
    },
    followedUser: {
      isFetched: false,
      data: [],
    },
    userSuggestion: {
      isFetched: false,
      data: [],
    },
    appUsers: {},
    metaData: {
      pageNo: 0,
      size: 5,
      total: 10,
    },
  },
  posts: {
    createPost: {
      postBeingCreated: false,
      error: null,
    },
    userPosts: {
      isFetched: true,
      data: [],
    },
    timelinePosts: {
      isFetched: true,
      data: [],
    },
    allPostsData: {},
    metaData: {
      pageNo: 0,
      size: 10,
      total: 10,
    },
  },
  error: {
    errorMsg: '',
    isOpen: false,
  },
  success: {
    successMsg: '',
    isOpen: false,
  },
  socket: {
    isSocketConnected: false,
    socketExist: false,
    //follow notification/comment notification/like notification
    notifications: {
      // follow: [userId1,userId2,userId3,userId4],
      // likePost: ['userId_postId'],
      // likeComment: ['userId_commentId_postId'],
      // comment: ['postId_commentId'],
      // data: {
      //   userId: {
      //     type: 'follow',
      //     userName: 'XYZ',
      //     userId: 'userId',
      //     id: 'userId',
      //   },
      //   userId_postId: {
      //     type: 'likePost',
      //     userName: 'XYZ',
      //     userId: 'userId',
      //     postId: 'postId',
      //     id: 'userId_postId',
      //     desc:"description",
      //     image:"imageOfPost"
      //   },
      //   userId_commentId: {
      //     type: 'likeComment',
      //     userName: 'XYZ',
      //     userId: 'userId',
      //     commentId: 'commentId',
      //     postId: 'postId',
      //     id: 'userId_commentId_postId',
      //     commentDesc:"commentDesc"
      //   },
      //   commentId: {
      //     type: 'comment',
      //     userName: 'XYZ',
      //     userId: 'userId',
      //     commentId: 'commentId',
      //     postId: 'postId',
      //     desc:"description",
      //     id: 'commentId_postId',
      //     image:"commentId"
      //     commentDesc:"commentDesc"
      //   },
      // },
      data: {},
      follow: [],
      likePost: [],
      likeComment: [],
      comment: [],
      isFetched: false,
      metaData: {
        pageNo: 0,
        size: 25,
        total: 25,
      },
    },
    liveUsers: {
      isFetched: false,
      data: {},
    },
  },
  comments: {
    postCommentDataMapping: {},
    commentsData: {},
    createComment: {
      commentBeingCreated: false,
    },
  },

  // comments:{
  //    postCommentDataMapping:{
  //   postId:{
  //   metaData: {
  //     pageNo: 0,
  //     size: 10,
  //     total: 10,
  //   },
  //   comments:[],
  //   isFetched: true,
  // }
  // },
  //   data:{
  //     commentId:{
  //       "commentData"
  //     }
  //   },
  //   createComment: {
  //     commentBeingCreated: false,
  //   },
  // }
};

export default initialState;
