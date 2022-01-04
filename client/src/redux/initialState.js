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
    followPosts: {
      isFetched: true,
      data: [],
    },
    allPostsData: {},
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
};

export default initialState;
