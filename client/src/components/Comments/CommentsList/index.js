import { connect } from 'react-redux';
import { createPost } from '../../../redux/actions/postActions';
import CommentsList from './CommentsList';

const mapStateToProps = (state) => {
  const {
    posts: { createPost: { postBeingCreated, error } } = {},
    user: {
      loggedInUser: { id },
      appUsers,
    },
  } = state;
  const userData = appUsers[id] || {};
  return {
    postBeingCreated,
    error,
    userData,
  };
};

const mapDispatchToProps = {
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
