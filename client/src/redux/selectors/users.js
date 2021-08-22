export const getLoggedInUser = (state) => {
  const { user: { loggedInUser = {} } = {} } = state;
  return loggedInUser;
};
