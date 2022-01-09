import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import {
  getAllUsersData,
  followUser,
  unFollowUser,
} from '../../redux/actions/userActions';

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
    loggedInUser,
  };
};

const mapDispatchToProps = {
  getAllUsersData,
  followUser,
  unFollowUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
