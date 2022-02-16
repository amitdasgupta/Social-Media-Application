import { connect } from 'react-redux';
import { getTimeLinePosts } from '../../redux/actions/postActions';
import Settings from './Settings';

const mapStateToProps = (state) => {};

const mapDispatchToProps = {
  getTimeLinePosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
