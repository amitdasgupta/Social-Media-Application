import { connect } from 'react-redux';
import { toggleLikeComment } from '../../../redux/actions/commentActions';
import CommentsCard from './CommentCard';

const mapStateToProps = (state, ownProps) => {
  const {
    comments: { commentsData = {} },
    user: { loggedInUser: { id: userId } = {} } = {},
  } = state;
  const { commentId } = ownProps;
  const commentData = commentsData[commentId];
  const { likes = [] } = commentData;
  const isCommentLiked = likes.includes(userId);
  return {
    commentData,
    isCommentLiked,
  };
};

const mapDispatchToProps = {
  toggleLikeComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsCard);
