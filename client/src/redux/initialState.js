const initialState = {
  user: {
    loggedInUser: {
      isFetched: false,
      data: {},
    },
    followedUser: {
      isFetched: false,
      data: {},
    },
    userSuggestion: {
      isFetched: false,
      data: {},
    },
  },
  posts: {
    isFetched: false,
    data: [],
  },
};

export default initialState;
