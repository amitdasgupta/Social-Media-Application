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
    userPosts: {
      isFetched: false,
      data: [],
    },
    followPosts: {
      isFetched: false,
      data: [],
    },
    posts: {},
  },
  comments: {},
};

export default initialState;
