export const getLoggedInUser = (state) => {
  const { user: { loggedInUser = {} } = {} } = state;
  return loggedInUser;
};

export const getUserMetaData = (state) => {
  const { user: { metaData = {} } = {} } = state;
  return metaData;
};
