const Notification = require('../database/models/Notification');

module.exports = {
  doesSameNotificationExsit: (dataForNotification) => {
    const notification = Notification.find({ ...dataForNotification });
    if (notification) return true;
    return false;
  },
};
