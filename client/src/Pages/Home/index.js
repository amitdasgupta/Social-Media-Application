import { connect } from 'react-redux';
import { getLoggedInUserData } from '../../redux/actions/userActions';
import { getAllNotifications } from '../../redux/actions/socketActions';
import Home from './Home';

const mapStateToProps = (state) => {
  const {
    user: { loggedInUser },
    socket: {
      notifications: { data = {} },
    },
  } = state;
  const notificationCount = Object.keys(data).length;
  return {
    loggedInUser,
    notificationCount,
  };
};

const mapDispatchToProps = {
  getLoggedInUserData,
  getAllNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
