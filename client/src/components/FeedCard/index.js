import { connect } from 'react-redux';
import { likePost, unLikePost } from '../../redux/actions/postActions';

import FeedCard from './FeedCard';

const mapStateToProps = (state, ownProps) => {
  const {
    posts: { allPostsData = {} } = {},
    user: { loggedInUser: { id: userId } = {} } = {},
  } = state;
  let isPostLiked = false;
  const { postId } = ownProps;
  const postData = allPostsData[postId];
  if (postData.likes.includes(userId)) isPostLiked = true;
  return {
    postData,
    isPostLiked,
  };
};

const mapDispatchToProps = {
  likePost,
  unLikePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedCard);
