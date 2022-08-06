import styles from '../../../stylesheets/components/Chat.module.scss';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
export default function UserItem({
  userId,
  userData,
  userFetched,
  getSingleUser,
}) {
  useEffect(() => {
    if (!userFetched) {
      getSingleUser(userId);
    }
  }, [userFetched, getSingleUser, userId]);
  const { profilepic, username } = userData || {};
  return userFetched ? (
    <div className={styles.onlineUsersListItem}>
      <div>
        <img
          alt={'User'}
          src={profilepic}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              'https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/29e18a8788acdf96b10dc12fee6fad77.jpeg?generation=1658328485730595&alt=media';
          }}
        />
      </div>
      <div>{username}</div>
      <div className={styles.onlineStatus}></div>
    </div>
  ) : (
    <Skeleton height={50} className={styles.loading} />
  );
}
