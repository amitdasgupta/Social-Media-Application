import { connect } from 'react-redux';
import { likePost } from '../../redux/actions/postActions';
import FeedCard from './FeedCard';

const mapStateToProps = (state, ownProps) => {
  const { posts: { allPostsData = {} } = {} } = state;
  const { postId } = ownProps;
  return {
    postData: allPostsData[postId],
  };
};

const mapDispatchToProps = {
  likePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedCard);
