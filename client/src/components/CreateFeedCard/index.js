import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/postActions';
import CreateFeed from './CreateFeed';

const mapStateToProps = (state) => {
  const { posts: { userPosts } = {} } = state;
  const loading = userPosts.isFetched;
  return {
    userPosts,
    loading,
  };
};

const mapDispatchToProps = {
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeed);
