import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/postActions';
import { setError } from '../../redux/actions/errorActions';
import CreateFeed from './CreateFeed';

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
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeed);
