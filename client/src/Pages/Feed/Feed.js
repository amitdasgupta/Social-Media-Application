/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import styles from '../../stylesheets/pages/Feed.module.scss';
import CreateFeed from '../../components/CreateFeedCard';
import FeedCard from '../../components/FeedCard';
import Skeleton from 'react-loading-skeleton';
import useInfiniteScrolling from '../../hooks/useInfiniteScrolling';

function Feed(props) {
  const {
    isLoading,
    getTimeLinePosts,
    isUserFetched,
    allPosts = [],
    nextLoading,
    isAllFeedFetched,
    pageNo,
  } = props;
  useEffect(() => {
    if (pageNo === 0 && isUserFetched && !isAllFeedFetched) {
      getTimeLinePosts();
    }
  }, [isUserFetched, getTimeLinePosts]);
  const [lastPostElementRef, isNextFetched, setNextFetched] =
    useInfiniteScrolling(isLoading);
  useEffect(() => {
    if (isNextFetched) {
      getTimeLinePosts();
      setNextFetched(false);
    }
  }, [isNextFetched, getTimeLinePosts, setNextFetched]);
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
          allPosts.map((postId, index) => (
            <FeedCard key={postId} postId={postId} />
          ))
        )}
        {!isAllFeedFetched && (
          <div key="last-ref-item" ref={lastPostElementRef}></div>
        )}
      </div>
      <div className={styles.mainFeedBottom}>
        {nextLoading && (
          <div styles={styles.skeleton}>
            <Skeleton height={400} count={5} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
