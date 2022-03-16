import styles from '../../../stylesheets/components/Comments.module.scss';
import { Avatar, TextField, Button } from '@material-ui/core';

export default function Comments() {
  const commentSubmit = (e) => {
    console.log('comment done');
  };
  return (
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
