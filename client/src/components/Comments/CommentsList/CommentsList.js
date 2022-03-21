/* eslint-disable react-hooks/exhaustive-deps */
import CommentCard from '../CommentCard';
import styles from '../../../stylesheets/components/Comments.module.scss';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useInfiniteScrolling from '../../../hooks/useInfiniteScrolling';

export default function Comments(props) {
  const {
    commentsList,
    isLoading,
    isNextLoading,
    isAllCommentsFetched,
    getPostComments,
    pageNo,
    postId,
  } = props;

  useEffect(() => {
    if (pageNo === 0) {
      getPostComments(postId);
    }
  }, [pageNo, postId, getPostComments]);

  const [lastPostElementRef, isNextFetched, setNextFetched] =
    useInfiniteScrolling(isLoading);

  useEffect(() => {
    if (isNextFetched) {
      getPostComments(postId);
      setNextFetched(false);
    }
  }, [isNextFetched, getPostComments, setNextFetched]);

  return (
    <div className={styles.commentsList}>
      {isLoading ? (
        <div className={styles.loadingComment}>
          <Skeleton height={150} count={10} />
        </div>
      ) : (
        (commentsList.length &&
          commentsList.map((item) => (
            <CommentCard commentId={item} key={item} />
          ))) || (
          <div className={styles.commentsItem}>No comments on this post</div>
        )
      )}
      {!isAllCommentsFetched && (
        <div key="last-ref-item" ref={lastPostElementRef}></div>
      )}
      {isNextLoading && (
        <div className={styles.loadingComment}>
          <Skeleton height={200} count={10} />
        </div>
      )}
    </div>
  );
}
