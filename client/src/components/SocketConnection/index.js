import { connect } from 'react-redux';
import { connectSocket } from '../../redux/actions/socketActions';
import SocketConnection from './SocketConnection';

const mapStateToProps = (state) => {
  const {
    socket: { isSocketConnected, socketExist },
    user: {
      loggedInUser: { id },
      appUsers,
    },
  } = state;
  return {
    isSocketConnected,
    userData: appUsers[id],
    socketExist,
  };
};

const mapDispatchToProps = {
  connectSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketConnection);
