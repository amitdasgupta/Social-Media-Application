import { connect } from 'react-redux';
import { createPost } from '../../../redux/actions/postActions';
import CommentsList from './CommentsList';

const mapStateToProps = (state, ownProps) => {
  const {
    comments: { postCommentDataMapping },
  } = state;
  const { postId } = ownProps;
  const { comments: commentsList = [] } = postCommentDataMapping[postId] || {};
  return {
    commentsList,
  };
};

const mapDispatchToProps = {
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
