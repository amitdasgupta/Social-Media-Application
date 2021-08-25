import { connect } from 'react-redux';
import { getTimeLinePosts } from '../../redux/actions/postActions';
import Feed from './Feed';
import moment from 'moment';

const mapStateToProps = (state) => {
  const { posts: { followPosts = {}, userPosts = {}, allPostsData } = {} } =
    state;
  const isLoading = !(userPosts.isFetched && followPosts.isFetched);
  const allPost = [...(userPosts.data || []), ...(followPosts.data || [])];
  const allSortedPost = allPost.sort((post1, post2) => {
    const post1Data = allPostsData[post1] || {};
    const post2Data = allPostsData[post2] || {};
    const post1Date = moment(post1Data.createdAt || '');
    const post2Date = moment(post2Data.createdAt || '');
    if (post1Date.isBefore(post2Date)) return 1;
    return -1;
  });
  return {
    isLoading,
    allPosts: allSortedPost,
  };
};

const mapDispatchToProps = {
  getTimeLinePosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
