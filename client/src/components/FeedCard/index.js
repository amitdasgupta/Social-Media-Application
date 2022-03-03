import { connect } from 'react-redux';
import { likePost, unLikePost } from '../../redux/actions/postActions';
import FeedCard from './FeedCard';

const mapStateToProps = (state, ownProps) => {
  const {
    posts: { allPostsData = {} } = {},
    user: { loggedInUser: { id: userId } = {}, appUsers } = {},
  } = state;
  let isPostLiked = false;
  const { postId } = ownProps;
  const postData = allPostsData[postId];
  const { userId: postUserId } = postData;
  if (postData.likes.includes(userId)) isPostLiked = true;
  const userData = appUsers[postUserId] || {};
  return {
    postData,
    isPostLiked,
    userData,
  };
};

const mapDispatchToProps = {
  likePost,
  unLikePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedCard);
