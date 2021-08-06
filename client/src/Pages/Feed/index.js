import styles from '../../stylesheets/pages/Feed.module.scss';
import CreateFeed from './CreateFeed';
import FeedCard from './FeedCard';
function Feed() {
  return (
    <div className={styles.mainFeed}>
      <div className={styles.mainFeedTop}>
        <CreateFeed />
      </div>
      <div className={styles.mainFeedBottom}>
        <FeedCard />
      </div>
    </div>
  );
}

export default Feed;
