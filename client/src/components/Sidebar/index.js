import { connect } from 'react-redux';
import { getLoggedInUserData } from '../../redux/actions/userActions';
import Sidebar from './Sidebar';

const mapStateToProps = (state) => {
  const {
    user: { loggedInUser, userSuggestion, followedUser },
  } = state;

  const isSidebarDataFetched = loggedInUser?.isFetched;

  return {
    isSidebarDataFetched,
    userSuggestion,
    followedUser,
  };
};

const mapDispatchToProps = {
  getLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
