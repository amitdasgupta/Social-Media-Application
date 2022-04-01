import NotificationsCard from './NotificationCard';
export default function NotificationsList(props) {
  const { notificationData } = props;
  const notificationKeys = Object.keys(notificationData);
  return notificationKeys.map((notificationId) => {
    const notiData = notificationData[notificationId];
    return <NotificationsCard key={notificationId} notiData={notiData} />;
  });
}
