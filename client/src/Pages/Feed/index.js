import { connect } from 'react-redux';
import { getTimeLinePosts } from '../../redux/actions/postActions';
import Feed from './Feed';

const mapStateToProps = (state) => {
  const {
    posts: {
      timelinePosts = {},
      metaData: { pageNo = 1, size = 10, total = 10 } = {},
    } = {},
  } = state;
  const isLoading = !timelinePosts.isFetched && pageNo === 1;
  const allPost = [...timelinePosts.data];
  const nextLoading = !timelinePosts.isFetched && pageNo > 1;
  const isAllFeedFetched = pageNo * size >= total;
  return {
    isLoading,
    allPosts: allPost,
    nextLoading,
    isAllFeedFetched,
  };
};

const mapDispatchToProps = {
  getTimeLinePosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
