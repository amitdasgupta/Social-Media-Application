import CommentCard from '../CommentCard';
import styles from '../../../stylesheets/components/Comments.module.scss';

export default function Comments(props) {
  const { commentsList } = props;
  return (
    <div className={styles.commentsList}>
      {(commentsList.length &&
        commentsList.map((item) => (
          <CommentCard commentId={item} key={item} />
        ))) || (
        <div className={styles.commentsItem}>No comments on this post</div>
      )}
    </div>
  );
}
