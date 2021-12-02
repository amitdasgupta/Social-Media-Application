import styles from '../../stylesheets/components/Sidebar.module.scss';
import { useEffect } from 'react';
import {
  RssFeed,
  Chat,
  Movie,
  Group,
  Bookmarks,
  Help,
  Work,
  Event,
  CastForEducation,
  GroupAdd,
} from '@material-ui/icons';
import { Avatar, Button } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';

function Sidebar(props) {
  const {
    isLoggedInUserDataFetched = false,
    isAllUserDataFetched = false,
    getAllUsersData,
  } = props;

  useEffect(() => {
    if (isLoggedInUserDataFetched) {
      getAllUsersData();
    }
  }, [isLoggedInUserDataFetched, getAllUsersData]);

  const giveLeftIcons = () => {
    const leftIcons = {
      Feed: RssFeed,
      Chats: Chat,
      Videos: Movie,
      Groups: Group,
      Bookmarks: Bookmarks,
      Questions: Help,
      Jobs: Work,
      Events: Event,
      Courses: CastForEducation,
    };
    return Object.keys(leftIcons).map((iconName) => {
      const IconSvg = leftIcons[iconName];
      const jsx = isAllUserDataFetched ? (
        <div className={styles.sideBarMainTopIcon} key={iconName}>
          <IconSvg className={styles.icon} />
          <div className={styles.sideBarMainTopIconName}>{iconName}</div>
        </div>
      ) : (
        <Skeleton
          className={styles.sideBarMainTopIcon}
          key={iconName}
          height={40}
        />
      );
      return jsx;
    });
  };

  const userListRowItem = (isAllUserDataFetched, index, userData, isFriend) => {
    const classNameForGroupLogo = cx(styles.icon, {
      [styles.friend]: isFriend,
    });
    console.log(classNameForGroupLogo);
    const { username, profilePic } = userData;
    const jsx = isAllUserDataFetched ? (
      <div className={styles.followDiv} key={`name-${index}`}>
        <div className={styles.sideBarMainTopIcon}>
          <Avatar alt={username} src={profilePic} className={styles.icon} />
          <div className={styles.sideBarMainTopIconName}>{username}</div>
        </div>
        {isFriend ? (
          <Group className={classNameForGroupLogo} />
        ) : (
          <GroupAdd className={classNameForGroupLogo} />
        )}
      </div>
    ) : (
      <Skeleton
        className={styles.sideBarMainTopIcon}
        key={`name-${index}`}
        height={40}
      />
    );
    return jsx;
  };

  const giveFriendList = () => {
    const {
      userSuggestion: { data: userSuggestionList = [] },
      followedUser: { data: followedUserList = [] },
      appUsers = {},
      isAllUserDataFetched,
    } = props;
    const userList = [];
    userList.push([
      ...followedUserList.map((item, index) => {
        const userData = appUsers[item];
        const jsx = userListRowItem(
          isAllUserDataFetched,
          index,
          userData,
          true
        );
        return jsx;
      }),
    ]);
    userList.push([
      ...userSuggestionList.map((item, index) => {
        const userData = appUsers[item];
        const jsx = userListRowItem(
          isAllUserDataFetched,
          index,
          userData,
          false
        );
        return jsx;
      }),
    ]);
    return userList;
  };

  return (
    <div className={styles.sideBarMain}>
      <div className={styles.sideBarMainTop}>
        {giveLeftIcons()}
        {isAllUserDataFetched ? (
          <Button variant="contained" className={styles.showMore}>
            Show More
          </Button>
        ) : (
          <Skeleton className={styles.showMore} />
        )}
      </div>
      <hr />
      <div className={styles.sideBarMainBottom}>{giveFriendList()}</div>
    </div>
  );
}

export default Sidebar;
