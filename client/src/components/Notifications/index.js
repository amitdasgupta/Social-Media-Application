import { connect } from 'react-redux';
import { connectSocket } from '../../redux/actions/socketActions';
import NotificationsList from './NotificationsList';

const mapStateToProps = (state) => {
  const {
    socket: {
      notifications: { data = {} },
    },
  } = state;
  return {
    notificationData: data,
  };
};

const mapDispatchToProps = {
  connectSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
