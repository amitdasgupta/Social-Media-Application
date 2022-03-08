import styles from '../../../stylesheets/components/UserList.module.scss';
import Skeleton from 'react-loading-skeleton';
const User = (props) => {
  const { isAllUserDataFetched, userData, isFriend, userId, loggedInUserId } =
    props;
  if (!userId || loggedInUserId === userId) return null;

  const followUser = (userId) => () => {
    const { followUser } = props;
    followUser(userId);
  };

  const unFollowUser = (data) => () => {
    const { unFollowUser } = props;
    unFollowUser(data);
  };
  const {
    username,
    profilepic,
    coverPicture,
    gender,
    city = 'Delhi',
    country = 'India',
    followers = [],
    following = [],
    posts = [],
  } = userData || {};
  const jsx = isAllUserDataFetched ? (
    <div
      className={styles.profileMain}
      style={{
        backgroundImage: `url(${coverPicture})`,
      }}
    >
      <div className={styles.profileMainContent}>
        {profilepic && (
          <div className={styles.profilePic}>
            <img src={profilepic} alt={username} />
          </div>
        )}
        <div className={styles.profileMainContentData}>
          <div className={styles.userDetail}>
            <div>{username}</div>
            <div>{`${gender}, ${city}, ${country}`}</div>
          </div>
          <div className={styles.userMetaData}>
            <div className={styles.userMetaDataItem}>
              <div>{`${posts.length}`}</div>
              <div>POSTS</div>
            </div>
            <div className={styles.userMetaDataItem}>
              <div>{`${followers.length}`}</div>
              <div>FOLLOWERS</div>
            </div>
            <div className={styles.userMetaDataItem}>
              <div>{`${following.length}`}</div>
              <div>FOLLOWING</div>
            </div>
          </div>
          <div
            onClick={
              isFriend
                ? unFollowUser({ userId, username })
                : followUser({ userId, username })
            }
            className={styles.userFollow}
          >
            {isFriend ? 'UNFOLLOW' : 'FOLLOW'}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton className={styles.sideBarMainTopIcon} height={40} />
  );
  return jsx;
};

export default User;
