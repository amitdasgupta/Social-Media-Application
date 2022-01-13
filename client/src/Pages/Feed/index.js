import { connect } from 'react-redux';
import { getTimeLinePosts } from '../../redux/actions/postActions';
import Feed from './Feed';

const mapStateToProps = (state) => {
  const { posts: { timelinePosts = {} } = {} } = state;
  const isLoading = !timelinePosts.isFetched;
  const allPost = [...timelinePosts.data];
  return {
    isLoading,
    allPosts: allPost,
  };
};

const mapDispatchToProps = {
  getTimeLinePosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
