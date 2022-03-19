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
      follow: [],
      like: ['61e96f936c2cc832998a8be3_61f05d2579824c097eb2007c'],
      comment: ['61e96f936c2cc832998a8be3_commentId'],
      data: {
        // '61e96f936c2cc832998a8be3': {
        //   type: 'follow',
        //   userName: 'XYZ',
        //   userId: '61e96f936c2cc832998a8be3',
        //   id: '61e96f936c2cc832998a8be3',
        // },
        // '61e96f936c2cc832998a8be3_61f05d2579824c097eb2007c': {
        //   type: 'like',
        //   userName: 'XYZ',
        //   userId: '61e96f936c2cc832998a8be3',
        //   postId: '61f05d2579824c097eb2007c',
        // },
        // '61e96f936c2cc832998a8be3_commentId': {
        //   type: 'comment',
        //   userName: 'XYZ',
        //   userId: '61e96f936c2cc832998a8be3',
        //   commentId: '61e96f936c2cc832998a8be3_commentId',
        // },
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
