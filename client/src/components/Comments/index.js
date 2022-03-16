import CommentsList from './CommentsList';
import CreateComment from './CreateComment';
import styles from '../../stylesheets/components/Comments.module.scss';

export default function Comments() {
  return (
    <div className={styles.mainCommentBox}>
      <CommentsList />
      <CreateComment />
    </div>
  );
}
