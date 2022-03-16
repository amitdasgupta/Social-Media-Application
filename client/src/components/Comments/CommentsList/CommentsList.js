import styles from '../../../stylesheets/components/Comments.module.scss';
import { MoreVert, ThumbUp } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';

export default function Comments() {
  const likes = [1, 2, 3];
  const isPostLiked = true;
  return (
    <div className={styles.commentsList}>
      <div className={styles.commentsItem}>
        <div className={styles.commentsItemDetail}>
          <div>
            <Avatar
              alt="Cindy Baker"
              className={styles.profilePic}
              src="https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/207d1f945c058d33c3ffeefdd82c547c.jpeg?generation=1646121249543202&alt=media"
            />
          </div>
          <div>
            Comment Text klkjiuh ijjjujh uuhhyuh khh jhdcjsdc cakocijaij
            scjijcnhc cjuihhuc
          </div>
        </div>
        <div className={styles.commentsItemEdit}>
          <MoreVert />
        </div>
        <div className={styles.likeDislike}>
          <ThumbUp
            className={isPostLiked ? styles.thumbUp : styles.thumbDown}
            // onClick={handleReaction}
          />
          <div className={styles.reactions}>{likes.length}</div>
        </div>
      </div>
      <div className={styles.commentsItem}>
        <div className={styles.commentsItemDetail}>
          <div>
            <Avatar
              alt="Cindy Baker"
              className={styles.profilePic}
              src="https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/207d1f945c058d33c3ffeefdd82c547c.jpeg?generation=1646121249543202&alt=media"
            />
          </div>
          <div>
            Comment Text klkjiuh ijjjujh uuhhyuh khh jhdcjsdc cakocijaij
            scjijcnhc cjuihhuc
          </div>
        </div>
        <div className={styles.commentsItemEdit}>
          <MoreVert />
        </div>
        <div className={styles.likeDislike}>
          <ThumbUp
            className={isPostLiked ? styles.thumbUp : styles.thumbDown}
            // onClick={handleReaction}
          />
          <div className={styles.reactions}>{likes.length}</div>
        </div>
      </div>
      <div className={styles.commentsItem}>
        <div className={styles.commentsItemDetail}>
          <div>
            <Avatar
              alt="Cindy Baker"
              className={styles.profilePic}
              src="https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/207d1f945c058d33c3ffeefdd82c547c.jpeg?generation=1646121249543202&alt=media"
            />
          </div>
          <div>
            Comment Text klkjiuh ijjjujh uuhhyuh khh jhdcjsdc cakocijaij
            scjijcnhc cjuihhuc
          </div>
        </div>
        <div className={styles.commentsItemEdit}>
          <MoreVert />
        </div>
        <div className={styles.likeDislike}>
          <ThumbUp
            className={isPostLiked ? styles.thumbUp : styles.thumbDown}
            // onClick={handleReaction}
          />
          <div className={styles.reactions}>{likes.length}</div>
        </div>
      </div>
      <div className={styles.commentsItem}>
        <div className={styles.commentsItemDetail}>
          <div>
            <Avatar
              alt="Cindy Baker"
              className={styles.profilePic}
              src="https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/207d1f945c058d33c3ffeefdd82c547c.jpeg?generation=1646121249543202&alt=media"
            />
          </div>
          <div>
            Comment Text klkjiuh ijjjujh uuhhyuh khh jhdcjsdc cakocijaij
            scjijcnhc cjuihhuc
          </div>
        </div>
        <div className={styles.commentsItemEdit}>
          <MoreVert />
        </div>
        <div className={styles.likeDislike}>
          <ThumbUp
            className={isPostLiked ? styles.thumbUp : styles.thumbDown}
            // onClick={handleReaction}
          />
          <div className={styles.reactions}>{likes.length}</div>
        </div>
      </div>
      <div className={styles.commentsItem}>
        <div className={styles.commentsItemDetail}>
          <div>
            <Avatar
              alt="Cindy Baker"
              className={styles.profilePic}
              src="https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/207d1f945c058d33c3ffeefdd82c547c.jpeg?generation=1646121249543202&alt=media"
            />
          </div>
          <div>
            Comment Text klkjiuh ijjjujh uuhhyuh khh jhdcjsdc cakocijaij
            scjijcnhc cjuihhuc
          </div>
        </div>
        <div className={styles.commentsItemEdit}>
          <MoreVert />
        </div>
        <div className={styles.likeDislike}>
          <ThumbUp
            className={isPostLiked ? styles.thumbUp : styles.thumbDown}
            // onClick={handleReaction}
          />
          <div className={styles.reactions}>{likes.length}</div>
        </div>
      </div>
      <div className={styles.commentsItem}>
        <div className={styles.commentsItemDetail}>
          <div>
            <Avatar
              alt="Cindy Baker"
              className={styles.profilePic}
              src="https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/207d1f945c058d33c3ffeefdd82c547c.jpeg?generation=1646121249543202&alt=media"
            />
          </div>
          <div>
            Comment Text klkjiuh ijjjujh uuhhyuh khh jhdcjsdc cakocijaij
            scjijcnhc cjuihhuc
          </div>
        </div>
        <div className={styles.commentsItemEdit}>
          <MoreVert />
        </div>
        <div className={styles.likeDislike}>
          <ThumbUp
            className={isPostLiked ? styles.thumbUp : styles.thumbDown}
            // onClick={handleReaction}
          />
          <div className={styles.reactions}>{likes.length}</div>
        </div>
      </div>
      <div className={styles.commentsItem}>
        <div className={styles.commentsItemDetail}>
          <div>
            <Avatar
              alt="Cindy Baker"
              className={styles.profilePic}
              src="https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/207d1f945c058d33c3ffeefdd82c547c.jpeg?generation=1646121249543202&alt=media"
            />
          </div>
          <div>
            Comment Text klkjiuh ijjjujh uuhhyuh khh jhdcjsdc cakocijaij
            scjijcnhc cjuihhuc
          </div>
        </div>
        <div className={styles.commentsItemEdit}>
          <MoreVert />
        </div>
        <div className={styles.likeDislike}>
          <ThumbUp
            className={isPostLiked ? styles.thumbUp : styles.thumbDown}
            // onClick={handleReaction}
          />
          <div className={styles.reactions}>{likes.length}</div>
        </div>
      </div>
      <div className={styles.commentsItem}>
        <div className={styles.commentsItemDetail}>
          <div>
            <Avatar
              alt="Cindy Baker"
              className={styles.profilePic}
              src="https://storage.googleapis.com/download/storage/v1/b/social-connect-4d3e3.appspot.com/o/207d1f945c058d33c3ffeefdd82c547c.jpeg?generation=1646121249543202&alt=media"
            />
          </div>
          <div>
            Comment Text klkjiuh ijjjujh uuhhyuh khh jhdcjsdc cakocijaij
            scjijcnhc cjuihhuc
          </div>
        </div>
        <div className={styles.commentsItemEdit}>
          <MoreVert />
        </div>
        <div className={styles.likeDislike}>
          <ThumbUp
            className={isPostLiked ? styles.thumbUp : styles.thumbDown}
            // onClick={handleReaction}
          />
          <div className={styles.reactions}>{likes.length}</div>
        </div>
      </div>
    </div>
  );
}
