import moment from 'moment';
import styles from '../../../stylesheets/components/Comments.module.scss';
import { MoreVert, ThumbUp } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';

export default function CommentCard(props) {
  const {
    commentData: { desc, likes = [], profilepic, createdAt, userName },
  } = props;
  const isPostLiked = true;
  return (
    <div className={styles.commentsItem}>
      <div className={styles.commentsMain}>
        <div className={styles.commentsItemDetail}>
          <div>
            <Avatar
              alt="Cindy Baker"
              className={styles.profilePic}
              src={profilepic}
            />
          </div>
          <div>{userName}</div>
          <div className={styles.postDate}>
            {moment(`${createdAt}`).calendar()}
          </div>
        </div>
        <div className={styles.commentsItemEdit}>
          <MoreVert />
        </div>
      </div>
      <div className={styles.commentDescription}>{desc}</div>
      <div className={styles.likeDislike}>
        <ThumbUp
          className={isPostLiked ? styles.thumbUp : styles.thumbDown}
          // onClick={handleReaction}
        />
        <div className={styles.reactions}>{likes.length}</div>
      </div>
    </div>
  );
}
