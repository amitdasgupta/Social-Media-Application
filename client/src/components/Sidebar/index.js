import styles from '../../stylesheets/components/Sidebar.module.scss';
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
} from '@material-ui/icons';
import { Avatar, Button } from '@material-ui/core';

function Sidebar() {
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
      const jsx = (
        <div className={styles.sideBarMainTopIcon} key={iconName}>
          <IconSvg className={styles.icon} />
          <div className={styles.sideBarMainTopIconName}>{iconName}</div>
        </div>
      );
      return jsx;
    });
  };
  const giveFriendList = () => {
    const friendList = new Array(15).fill({
      name: 'Jhon Doe',
      profilePic:
        'https://avatars.githubusercontent.com/u/25057271?s=400&u=f475d749d61767325c66668e7adf165d5460c135&v=4',
    });
    return friendList.map((item, index) => {
      const { name, profilePic } = item;
      const jsx = (
        <div className={styles.sideBarMainTopIcon} key={`name-${index}`}>
          <Avatar alt={name} src={profilePic} className={styles.icon} />
          <div className={styles.sideBarMainTopIconName}>{name}</div>
        </div>
      );
      return jsx;
    });
  };
  return (
    <div className={styles.sideBarMain}>
      <div className={styles.sideBarMainTop}>
        {giveLeftIcons()}
        <Button variant="contained" className={styles.showMore}>
          Show More
        </Button>
      </div>
      <hr />
      <div className={styles.sideBarMainBottom}>{giveFriendList()}</div>
    </div>
  );
}

export default Sidebar;
