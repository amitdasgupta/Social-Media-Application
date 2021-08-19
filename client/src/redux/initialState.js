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
    isFetched: false,
    data: [],
  },
};

export default initialState;
