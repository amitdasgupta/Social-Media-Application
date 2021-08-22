import { useEffect } from 'react';
import styles from '../../stylesheets/pages/Feed.module.scss';
import CreateFeed from '../../components/CreateFeedCard';
import FeedCard from '../../components/FeedCard';
import Skeleton from 'react-loading-skeleton';
function Feed(props) {
  const {
    isLoading,
    getTimeLinePosts,
    isUserFetched,
    allPosts = [],
    allPostsData = {},
  } = props;
  useEffect(() => {
    if (isUserFetched) {
      getTimeLinePosts();
    }
  }, [isUserFetched, getTimeLinePosts]);
  return (
    <div className={styles.mainFeed}>
      <div className={styles.mainFeedTop}>
        <CreateFeed />
      </div>
      <div className={styles.mainFeedBottom}>
        {isLoading ? (
          <Skeleton height={600} />
        ) : (
          allPosts.map((postId) => {
            const postData = allPostsData[postId];
            return postData && <FeedCard key={postId} postData={postData} />;
          })
        )}
      </div>
    </div>
  );
}

export default Feed;
