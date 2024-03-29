import { connect } from 'react-redux';
import { connectSocket } from '../../redux/actions/socketActions';
import Search from './Search';

const mapStateToProps = (state, ownProps) => {
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
    ...ownProps,
  };
};

const mapDispatchToProps = {
  connectSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
