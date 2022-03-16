import styles from '../../../stylesheets/components/Comments.module.scss';
import { Avatar, TextField, Button } from '@material-ui/core';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function Comments(props) {
  const { createComment, commentBeingCreated, setError } = props;
  const [comment, setComment] = useState('');
  const commentSubmit = (e) => {
    const { postId } = props;
    if (comment === '') {
      return setError('Empty comment is not allowed');
    }
    createComment({ desc: comment, postId });
  };
  const inputChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };
  return commentBeingCreated ? (
    <Skeleton height={50} className={styles.commentsInput} />
  ) : (
    <div className={styles.commentsInput}>
      <Avatar
        className={styles.commentsInputIcon}
        alt="Cindy Baker"
        src="https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/207d1f945c058d33c3ffeefdd82c547c.jpeg?generation=1646121249543202&alt=media"
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
