import styles from '../../../stylesheets/components/Comments.module.scss';
import { Avatar, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function Comments(props) {
  const { scrollCommentToTop } = props;
  const { createComment, commentBeingCreated, setError, userData } = props;
  const [comment, setComment] = useState('');
  const { profilepic } = userData;
  const commentSubmit = (e) => {
    const { postId } = props;
    if (comment === '') {
      return setError('Empty comment is not allowed');
    }
    setComment('');
    scrollCommentToTop();
    createComment({ desc: comment, postId });
  };
  const inputChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };
  return commentBeingCreated ? (
    <Skeleton height={100} className={styles.commentsInput} />
  ) : (
    <div className={styles.commentsInput}>
      <Avatar
        className={styles.commentsInputIcon}
        alt="Cindy Baker"
        src={profilepic}
      />
      <TextField
        id="standard-multiline-flexible"
        label="Comment here"
        maxRows={4}
        className={styles.input}
        variant="standard"
        name="desc"
        multiline
        onChange={inputChange}
        value={comment}
      />
      <Button
        variant="contained"
        className={styles.buttonEnd}
        onClick={commentSubmit}
      >
        Comment
      </Button>
    </div>
  );
}
