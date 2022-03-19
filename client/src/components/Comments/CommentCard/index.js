import { connect } from 'react-redux';
import { getPostComments } from '../../../redux/actions/commentActions';
import CommentsCard from './CommentCard';

const mapStateToProps = (state, ownProps) => {
  const {
    comments: { commentsData = {} },
  } = state;
  const { commentId } = ownProps;
  const commentData = commentsData[commentId];
  return {
    commentData,
  };
};

const mapDispatchToProps = {
  getPostComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsCard);
