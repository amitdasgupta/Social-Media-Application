export const getAllSocketsIds = (state) => {
  const {
    socket: {
      liveUsers: { data },
    },
  } = state;
  return data;
};
