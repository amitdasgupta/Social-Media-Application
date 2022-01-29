import { connect } from 'react-redux';
import { connectSocket } from '../../redux/actions/socketActions';
import NotificationsList from './NotificationsList';

const mapStateToProps = (state) => {
  const {
    socket: {
      notifications: { data },
      follow,
      like,
      comment,
    },
    user: { userSuggestion, followedUser, appUsers },
  } = state;

  const isAllUserDataFetched =
    userSuggestion?.isFetched && followedUser?.isFetched;
  return {
    follow,
    like,
    comment,
    notificationData: data,
    appUsers,
    isAllUserDataFetched,
  };
};

const mapDispatchToProps = {
  connectSocket,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
