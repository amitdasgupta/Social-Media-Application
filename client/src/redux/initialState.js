const initialState = {
  user: {
    loggedInUser: {
      isFetched: false,
      id: null,
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
  comments: {},
  error: {
    errorMsg: 'Hey Error',
    isOpen: false,
  },
  success: {
    successMsg: 'Hey Success ',
    isOpen: false,
  },
  socket: {
    isSocketConnected: false,
    socketExist: false,
    //follow notification/comment notification/like notification
    notifications: {
      follow: [1],
      like: [],
      comment: [],
      data: {
        1: {
          type: 'follow',
          userName: 'XYZ',
          userId: '61e96f936c2cc832998a8be3',
        },
        2: {
          type: 'like',
          userName: 'XYZ',
          userId: '61e96f936c2cc832998a8be3',
        },
        3: {
          type: 'comment',
          userName: 'XYZ',
          userId: '61e96f936c2cc832998a8be3',
          comment: 'This is my comment',
          postId: '61f05d2579824c097eb2007c',
        },
      },
    },
    liveUsers: {
      isFetched: false,
      data: {},
    },
  },
};

export default initialState;
