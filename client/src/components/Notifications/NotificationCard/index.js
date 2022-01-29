import { connect } from 'react-redux';
import NotificationsCard from './NotificationCard';

const mapStateToProps = (state) => {
  const {
    user: { userSuggestion, followedUser },
  } = state;

  const isAllUserDataFetched =
    userSuggestion?.isFetched && followedUser?.isFetched;
  return {
    isAllUserDataFetched,
  };
};

export default connect(mapStateToProps)(NotificationsCard);
