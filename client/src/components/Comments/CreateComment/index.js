import { connect } from 'react-redux';
import { createComment } from '../../../redux/actions/commentActions';
import { setError } from '../../../redux/actions/errorActions';
import CreateComment from './CreateComment';

const mapStateToProps = (state, ownProps) => {
  const { comments: { createComment: { commentBeingCreated } } = {} } = state;
  const { postId } = ownProps;
  return {
    commentBeingCreated,
    postId,
  };
};

const mapDispatchToProps = {
  createComment,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
