import styles from '../../../stylesheets/components/UserList.module.scss';
import { Group, GroupAdd } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';
// {
//     userData: {
//       isAllUserDataFetched,
//       userData,
//       isFriend,
//       userId,
//       followUser,
//       unFollowUser,
//     },
//   }
const User = (props) => {
  const { isAllUserDataFetched, userData, isFriend, userId, loggedInUserId } =
    props;
  if (!userId || loggedInUserId === userId) return null;
  const classNameForGroupLogo = cx(styles.icon, {
    [styles.friend]: isFriend,
  });
  const followUser = (userId) => () => {
    const { followUser } = props;
    followUser(userId);
  };

  const unFollowUser = (data) => () => {
    const { unFollowUser } = props;
    unFollowUser(data);
  };
  const { username, profilepic, coverPicture } = userData || {};
  const jsx = isAllUserDataFetched ? (
    <div className={styles.followDiv}>
      <div className={styles.sideBarMainTopIcon}>
        <Avatar alt={username} src={profilepic} className={styles.icon} />
        <div className={styles.sideBarMainTopIconName}>{username}</div>
      </div>
      {isFriend ? (
        <Group
          className={classNameForGroupLogo}
          onClick={unFollowUser({ userId, username })}
        />
      ) : (
        <GroupAdd
          className={classNameForGroupLogo}
          onClick={followUser({ userId, username })}
        />
      )}
    </div>
  ) : (
    <Skeleton className={styles.sideBarMainTopIcon} height={40} />
  );
  return jsx;
};

export default User;
