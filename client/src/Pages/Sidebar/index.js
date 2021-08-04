import styles from '../../stylesheets/pages/Sidebar.module.scss';
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
  return (
    <div className={styles.sideBarMain}>
      <div className={styles.sideBarMainTop}>
        {giveLeftIcons()}
        <div className={styles.showMore}>Show More</div>
      </div>
      <hr />
      <div className={styles.sideBarMainBottom}></div>
    </div>
  );
}

export default Sidebar;
