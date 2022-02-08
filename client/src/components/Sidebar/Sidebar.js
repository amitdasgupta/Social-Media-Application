import styles from '../../stylesheets/components/Sidebar.module.scss';
import { useEffect } from 'react';
import { Group, GroupAdd } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';

function Sidebar(props) {
  const { isLoggedInUserDataFetched = false, getAllUsersData } = props;

  useEffect(() => {
    if (isLoggedInUserDataFetched) {
      getAllUsersData();
    }
  }, [isLoggedInUserDataFetched, getAllUsersData]);

  const followUser = (userId) => () => {
    const { followUser } = props;
    followUser(userId);
  };

  const unFollowUser = (data) => () => {
    const { unFollowUser } = props;
    unFollowUser(data);
  };

  const userListRowItem = (
    isAllUserDataFetched,
    index,
    userData,
    isFriend,
    userId
  ) => {
    if (!userId) return null;
    const classNameForGroupLogo = cx(styles.icon, {
      [styles.friend]: isFriend,
    });
    const { username, profilePic } = userData || {};
    const jsx = isAllUserDataFetched ? (
      <div className={styles.followDiv} key={`name-${userId}`}>
        <div className={styles.sideBarMainTopIcon}>
          <Avatar alt={username} src={profilePic} className={styles.icon} />
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
      <Skeleton
        className={styles.sideBarMainTopIcon}
        key={`name-${userId}`}
        height={40}
      />
    );
    return jsx;
  };

  const giveFriendList = () => {
    const {
      followedUser: { data: followedUserList = [] },
      appUsers = {},
      isAllUserDataFetched,
      loggedInUser: { id: loggedInUserId } = {},
    } = props;
    const followedUserMap = followedUserList.reduce((allData, data) => {
      allData[data] = true;
      return allData;
    }, {});

    return Object.keys(appUsers).map((userId, index) => {
      if (userId === loggedInUserId) return null;
      const userData = appUsers[userId];
      let followed = false;
      if (followedUserMap[userId]) {
        followed = true;
      }
      const jsx = userListRowItem(
        isAllUserDataFetched,
        index,
        userData,
        followed,
        userId
      );
      return jsx;
    });
  };

  return (
    <div className={styles.sideBarMain}>
      <div className={styles.sideBarMainBottom}>{giveFriendList()}</div>
    </div>
  );
}

export default Sidebar;
