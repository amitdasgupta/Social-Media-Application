import { connect } from 'react-redux';
import { getTimeLinePosts } from '../../redux/actions/postActions';
import Feed from './Feed';

const mapStateToProps = (state) => {
  const {
    posts: {
      timelinePosts = {},
      metaData: { pageNo = 1, size = 10, total = 10 } = {},
    } = {},
    user: { loggedInUser },
  } = state;
  const isLoading = !timelinePosts.isFetched && pageNo === 1;
  const allPost = [...timelinePosts.data];
  const nextLoading = !timelinePosts.isFetched && pageNo > 1;
  const isAllFeedFetched = pageNo * size >= total;
  const isUserFetched = loggedInUser?.isFetched;
  return {
    isLoading,
    allPosts: allPost,
    nextLoading,
    isAllFeedFetched,
    isUserFetched,
    pageNo,
  };
};

const mapDispatchToProps = {
  getTimeLinePosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
