const Notification = require('../database/models/Notification');

module.exports = {
  doesSameNotificationExsit: async (dataForNotification) => {
    const notification = await Notification.findOne({ ...dataForNotification });
    if (notification) return true;
    return false;
  },
};
