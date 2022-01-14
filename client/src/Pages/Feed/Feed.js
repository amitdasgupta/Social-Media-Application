import { useEffect, useState, useRef, useCallback } from 'react';
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
    nextLoading,
    isAllFeedFetched,
  } = props;
  const [isNextFetched, setNextFetched] = useState(false);
  const observer = useRef();
  const lastPostElementRef = useCallback(
    // (*)
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setNextFetched(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );
  useEffect(() => {
    getTimeLinePosts();
  }, [isUserFetched, getTimeLinePosts]);
  useEffect(() => {
    if (isNextFetched) {
      getTimeLinePosts();
      setNextFetched(false);
    }
  }, [isNextFetched, getTimeLinePosts]);
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
