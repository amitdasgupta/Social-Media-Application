import { connect } from 'react-redux';
import { createComment } from '../../../redux/actions/commentActions';
import { setError } from '../../../redux/actions/errorActions';
import CreateComment from './CreateComment';

const mapStateToProps = (state, ownProps) => {
  const {
    comments: { createComment: { commentBeingCreated } } = {},
    user: {
      loggedInUser: { id: userId },
      appUsers,
    },
  } = state;
  const { postId } = ownProps;
  const userData = appUsers[userId];
  return {
    commentBeingCreated,
    postId,
    userData,
  };
};

const mapDispatchToProps = {
  createComment,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
