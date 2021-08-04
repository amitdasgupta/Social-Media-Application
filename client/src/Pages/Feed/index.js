import styles from '../../stylesheets/pages/Feed.module.scss';
import CreateFeed from './CreateFeed';
function Feed() {
  return (
    <div className={styles.mainFeed}>
      <div className={styles.mainFeedTop}>
        <CreateFeed />
      </div>
      <div className={styles.mainFeedBottom}></div>
    </div>
  );
}

export default Feed;
