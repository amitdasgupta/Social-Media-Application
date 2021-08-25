import { useEffect } from 'react';
import styles from '../../stylesheets/pages/Feed.module.scss';
import CreateFeed from '../../components/CreateFeedCard';
import FeedCard from '../../components/FeedCard';
import Skeleton from 'react-loading-skeleton';
function Feed(props) {
  const { isLoading, getTimeLinePosts, isUserFetched, allPosts = [] } = props;
  useEffect(() => {
    getTimeLinePosts();
  }, [isUserFetched, getTimeLinePosts]);
  return (
    <div className={styles.mainFeed}>
      <div className={styles.mainFeedTop}>
        <CreateFeed />
      </div>
      <div className={styles.mainFeedBottom}>
        {isLoading ? (
          <div styles={styles.skeleton}>
            <Skeleton height={400} count={5} />
          </div>
        ) : (
          allPosts.map((postId) => <FeedCard key={postId} postId={postId} />)
        )}
      </div>
    </div>
  );
}

export default Feed;
