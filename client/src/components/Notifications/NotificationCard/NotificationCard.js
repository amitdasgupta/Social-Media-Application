import styles from '../../../stylesheets/components/Notifications.module.scss';
import { CancelOutlined, AccountCircle } from '@material-ui/icons';
import { useEffect } from 'react';

export default function NotificationsCard(props) {
  const { notiData = {}, userFetched, getSingleUser, profilepic } = props;
  const { userId, desc = '', image } = notiData;

  useEffect(() => {
    if (!userFetched) {
      getSingleUser(userId);
    }
  }, [userFetched, getSingleUser, userId]);

  const giveNotificationCard = (notiData) => {
    const { type, userName, commentDesc } = notiData;
    switch (type) {
      case 'follow':
        return (
          <>
            <span className={styles.userName}>
              {`${userName} `}
              <span>followed you</span>
            </span>
          </>
        );
      case 'likePost':
        return (
          <>
            <span className={styles.userName}>
              {`${userName} `}
              <span>liked your post.</span>
            </span>
            <span className={styles.postLike}>
              <div>
                {` ${desc.slice(0, 10)}`}
                {desc.length > 15 && '...'}
              </div>
              {image && (
                <img
                  alt="Post"
                  src={image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      'https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/29e18a8788acdf96b10dc12fee6fad77.jpeg?generation=1658328485730595&alt=media';
                  }}
                />
              )}
            </span>
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
            <span className={styles.userName}>
              {`${userName} `}
              <span> commented on your post.</span>
            </span>
            <span className={styles.postLike}>
              <div>
                {` ${desc.slice(0, 10)}`}
                {desc.length > 15 && '...'}
              </div>
              {image && (
                <img
                  alt="Post"
                  src={image}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src =
                      'https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/29e18a8788acdf96b10dc12fee6fad77.jpeg?generation=1658328485730595&alt=media';
                  }}
                />
              )}
            </span>
            <div className={styles.postComment}>{commentDesc}</div>
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
            <img
              alt="Jon Doe"
              src={profilepic}
              className={styles.icon}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  'https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/29e18a8788acdf96b10dc12fee6fad77.jpeg?generation=1658328485730595&alt=media';
              }}
            />
          ) : (
            <AccountCircle className={styles.icon} />
          )}
          <div className={styles.detail}>{giveNotificationCard(notiData)}</div>
        </div>
        <CancelOutlined className={styles.cancel} />
      </div>
    </div>
  );
}
