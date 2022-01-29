import NotificationsCard from './NotificationCard';
export default function NotificationsList(props) {
  const { notificationData, appUsers } = props;
  const notificationKeys = Object.keys(notificationData);
  return notificationKeys.map((notificationId) => {
    const data = notificationData[notificationId];
    const userData = appUsers[data.userId] || {};
    data.profilePic = userData.profilepic;
    return <NotificationsCard key={notificationId} data={data} />;
  });
}
