import CommentCard from '../CommentCard';
import styles from '../../../stylesheets/components/Comments.module.scss';

export default function Comments() {
  const comments = new Array(1000).fill(null);
  return (
    <div className={styles.commentsList}>
      {comments.map((item) => (
        <CommentCard />
      ))}
    </div>
  );
}
