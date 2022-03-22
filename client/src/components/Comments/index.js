import CommentsList from './CommentsList';
import CreateComment from './CreateComment';
import styles from '../../stylesheets/components/Comments.module.scss';
import { useRef } from 'react';

export default function Comments(props) {
  const commentsListRef = useRef(null);
  const scrollCommentToTop = () => {
    commentsListRef?.current?.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className={styles.mainCommentBox}>
      <CreateComment scrollCommentToTop={scrollCommentToTop} {...props} />
      <CommentsList commentsListRef={commentsListRef} {...props} />
    </div>
  );
}
