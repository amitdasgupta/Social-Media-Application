import { connect } from 'react-redux';
import { connectSocket } from '../../redux/actions/socketActions';
import Rightbar from './Rightbar';

const mapStateToProps = (state) => {
  const {
    socket: { isSocketConnected },
  } = state;
  return {
    isSocketConnected,
  };
};

const mapDispatchToProps = {
  connectSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rightbar);
