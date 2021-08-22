import styles from '../../stylesheets/pages/Feed.module.scss';
import CreateFeed from '../../components/CreateFeedCard';
import FeedCard from '../../components/FeedCard';
import Skeleton from 'react-loading-skeleton';
function Feed(props) {
  const { isLoading } = props;
  return (
    <div className={styles.mainFeed}>
      <div className={styles.mainFeedTop}>
        <CreateFeed />
      </div>
      <div className={styles.mainFeedBottom}>
        {isLoading ? <Skeleton height={600} /> : <FeedCard />}
      </div>
    </div>
  );
}

export default Feed;
