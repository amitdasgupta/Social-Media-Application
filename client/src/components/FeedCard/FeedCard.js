import styles from '../../stylesheets/components/FeedCard.module.scss';
import { Avatar, Tooltip } from '@material-ui/core';
import { ThumbUp, MoreVert } from '@material-ui/icons';
import { forwardRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import Comment from '../Comments';

function FeedCard(props, ref) {
  const { postData = null, isPostLiked } = props;
  const {
    desc = '',
    image,
    createdAt = '',
    userName = 'Social Connect',
    likes = [],
    _id,
    location = '',
    profilepic,
  } = postData || {};

  const { likePost, unLikePost } = props;
  const handleReaction = () => {
    if (isPostLiked) unLikePost(_id);
    else likePost(_id);
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
      <div className={styles.feedCard} ref={ref}>
        <div className={styles.top}>
          <div className={styles.start}>
            {(profilepic && (
              <Avatar alt="Jon Doe" src={profilepic} className={styles.icon} />
            )) || <Skeleton className={styles.icon} />}
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
        <div>
          {location !== '' && (
            <Tooltip title={location}>
              <div className={styles.feedLocation}>
                <span className={styles.feedLocationNear}>Near</span>
                {` : ${location.slice(0, 17) + '...'}`}
              </div>
            </Tooltip>
          )}
          <div className={styles.feedDetails}>
            <div className={styles.start}>
              <ThumbUp
                className={isPostLiked ? styles.thumbUp : styles.thumbDown}
                onClick={handleReaction}
              />
              <div className={styles.reactions}>{likes.length}</div>
              <div className={styles.interactionMsg}>
                {giveUserInteractionMsg()}
              </div>
            </div>
            <div className={styles.end}>5 comments</div>
          </div>
          <Comment postId={_id} />
        </div>
      </div>
    )
  );
}

export default forwardRef(FeedCard);
