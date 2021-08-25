import styles from '../../stylesheets/components/FeedCard.module.scss';
import { Avatar } from '@material-ui/core';
import { ThumbUp, ThumbDown, MoreVert } from '@material-ui/icons';
import moment from 'moment';

function FeedCard(props) {
  const { postData = null, isPostLiked } = props;
  const {
    desc = '',
    image,
    createdAt = '',
    userName = 'Social Connect',
    likes = [],
    id,
  } = postData || {};
  const { likePost, unLikePost } = props;
  const handleReaction = () => {
    if (isPostLiked) unLikePost(id);
    else likePost(id);
  };
  const giveUserInteractionMsg = () => {
    const size = likes.length;
    if (size === 0) return '';
    if (isPostLiked) {
      if (size > 1) return `You and ${size - 1} others liked this`;
      return 'You  liked this';
    }
    return `${size} others liked this`;
  };
  return (
    postData && (
      <div className={styles.feedCard}>
        <div className={styles.top}>
          <div className={styles.start}>
            <Avatar
              alt="Jon Doe"
              src="https://avatars.githubusercontent.com/u/25057271?s=400&u=f475d749d61767325c66668e7adf165d5460c135&v=4"
              className={styles.icon}
            />
            <div className={styles.postUser}>{userName}</div>
            <div className={styles.postDate}>
              {moment(`${createdAt}`).calendar()}
            </div>
          </div>
          <div className={styles.end}>
            <MoreVert />
          </div>
        </div>
        <div className={styles.details}>{desc}</div>
        {image && (
          <div className={styles.feedPic}>
            <img alt={desc} src={image} />
          </div>
        )}
        <div className={styles.feedDetails}>
          <div className={styles.start}>
            {isPostLiked ? (
              <ThumbDown className={styles.thumbUp} onClick={handleReaction} />
            ) : (
              <ThumbUp className={styles.thumbUp} onClick={handleReaction} />
            )}

            {/* <Favorite className={styles.heart} /> */}
            <div className={styles.reactions}>{likes.length}</div>
            <div className={styles.interactionMsg}>
              {giveUserInteractionMsg()}
            </div>
          </div>
          <div className={styles.end}>5 comments</div>
        </div>
      </div>
    )
  );
}

export default FeedCard;
