import styles from '../../../stylesheets/components/Notifications.module.scss';
import { CancelOutlined, AccountCircle } from '@material-ui/icons';
import { useEffect } from 'react';

export default function NotificationsCard(props) {
  const { notiData = {}, userFetched, getSingleUser, profilepic } = props;
  const { userId, userName } = notiData;
  useEffect(() => {
    if (!userFetched) {
      getSingleUser(userId);
    }
  }, [userFetched, getSingleUser, userId]);

  const giveNotificationCard = (notiData) => {
    const { type } = notiData;
    switch (type) {
      case 'follow':
        return <>followed you</>;
      case 'likePost':
        return (
          <>
            {' '}
            liked post
            <span className={styles.postLike}>{` PostName`}</span>
          </>
        );
      case 'likeComment':
        return (
          <>
            liked your comment
            <span className={styles.postLike}>{` Comment`}</span>
          </>
        );
      case 'comment':
        return (
          <>
            commented on your
            <span className={styles.postLike}>{` Post`}</span>
          </>
        );
      default:
        return <>followed you</>;
    }
  };

  return (
    <div className={styles.notifications}>
      <div className={styles.item}>
        <div className={styles.start}>
          {userFetched && profilepic !== null ? (
            <img alt="Jon Doe" src={profilepic} className={styles.icon} />
          ) : (
            <AccountCircle className={styles.icon} />
          )}
          <div className={styles.detail}>
            <span className={styles.userName}>{`${userName} `}</span>
            {giveNotificationCard(notiData)}
          </div>
        </div>
        <CancelOutlined className={styles.cancel} />
      </div>
    </div>
  );
}
