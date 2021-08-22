import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/postActions';
import CreateFeed from './CreateFeed';

const mapStateToProps = (state) => {
  const { posts: { createPost: { postBeingCreated, error } } = {} } = state;
  return {
    postBeingCreated,
    error,
  };
};

const mapDispatchToProps = {
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeed);
