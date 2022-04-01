import { connect } from 'react-redux';
import NotificationsCard from './NotificationCard';
import { getSingleUser } from '../../../redux/actions/userActions';

const mapStateToProps = (state, ownProps) => {
  const {
    user: { appUsers },
  } = state;

  const {
    notiData: { userId },
  } = ownProps;
  const userData = appUsers[userId];
  const { profilepic = null } = userData || {};
  const userFetched = !!userData;
  return {
    ...ownProps,
    profilepic,
    userFetched,
  };
};

const mapDispatchToProps = {
  getSingleUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsCard);
