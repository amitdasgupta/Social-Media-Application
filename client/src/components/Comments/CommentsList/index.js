import { connect } from 'react-redux';
import { getPostComments } from '../../../redux/actions/commentActions';
import CommentsList from './CommentsList';

const mapStateToProps = (state, ownProps) => {
  const {
    comments: { postCommentDataMapping },
  } = state;
  const { postId } = ownProps;
  const commentsData = postCommentDataMapping[postId] || {};
  const { commentsIds: commentsList = [] } = commentsData;
  const { metaData: { pageNo = 0, size = 10, total = 10 } = {} } = commentsData;
  const isLoading = !commentsData?.isFetched && pageNo === 1;
  const isNextLoading = !commentsData?.isFetched && pageNo > 1;
  const isAllCommentsFetched = pageNo * size >= total;
  return {
    isLoading,
    isNextLoading,
    isAllCommentsFetched,
    commentsList,
    pageNo,
    postId,
  };
};

const mapDispatchToProps = {
  getPostComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
