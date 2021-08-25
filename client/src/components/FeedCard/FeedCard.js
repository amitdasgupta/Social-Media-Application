import styles from '../../stylesheets/components/FeedCard.module.scss';
import { Avatar } from '@material-ui/core';
import { ThumbUp, Favorite, MoreVert } from '@material-ui/icons';
import moment from 'moment';

function FeedCard(props) {
  const { postData = null } = props;
  const {
    desc = '',
    image,
    createdAt = '',
    userName = 'Social Connect',
    likes = [],
    id,
  } = postData || {};
  const { likePost } = props;
  const handleReaction = () => {
    likePost(id);
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
            <ThumbUp className={styles.thumbUp} onClick={handleReaction} />
            {/* <Favorite className={styles.heart} /> */}
            <div className={styles.reactions}>{likes.length}</div>
          </div>
          <div className={styles.end}>5 comments</div>
        </div>
      </div>
    )
  );
}

export default FeedCard;