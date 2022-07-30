export const getNotificationMetaData = (state) => {
  const { socket: { notifications: { metaData } = {} } = {} } = state;
  return metaData;
};
