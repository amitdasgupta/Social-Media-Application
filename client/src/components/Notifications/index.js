import { connect } from 'react-redux';
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

export default connect(mapStateToProps)(NotificationsList);
