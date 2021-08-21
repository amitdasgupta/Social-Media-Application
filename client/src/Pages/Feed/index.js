import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/postActions';
import Feed from './Feed';

const mapStateToProps = (state) => {
  const {
    user: { loggedInUser } = {},
    posts: { followPosts, userPosts } = {},
  } = state;
  const isLoading = !loggedInUser.isFetched;
  return {
    isLoading,
    followPosts,
    userPosts,
  };
};

const mapDispatchToProps = {
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
