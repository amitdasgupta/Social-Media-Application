import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import { getAllUsersData } from '../../redux/actions/userActions';

const mapStateToProps = (state) => {
  const {
    user: { loggedInUser, userSuggestion, followedUser, appUsers },
  } = state;

  const isAllUserDataFetched =
    userSuggestion?.isFetched && followedUser?.isFetched;

  const isLoggedInUserDataFetched = loggedInUser?.isFetched;

  return {
    isAllUserDataFetched,
    isLoggedInUserDataFetched,
    userSuggestion,
    followedUser,
    appUsers,
  };
};

const mapDispatchToProps = {
  getAllUsersData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
