import CommentsList from './CommentsList';
import CreateComment from './CreateComment';
import styles from '../../stylesheets/components/Comments.module.scss';

export default function Comments(props) {
  return (
    <div className={styles.mainCommentBox}>
      <CreateComment {...props} />
      <CommentsList {...props} />
    </div>
  );
}
