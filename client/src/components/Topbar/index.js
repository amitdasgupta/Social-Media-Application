import { connect } from 'react-redux';
import TopBar from './TopBar';

const mapStateToProps = (state) => {
  const {
    user: { loggedInUser, appUsers },
  } = state;

  const isLoggedInUserDataFetched = loggedInUser?.isFetched;
  const { id } = loggedInUser;
  const userData = appUsers[id];
  return {
    isLoggedInUserDataFetched,
    userData,
  };
};

export default connect(mapStateToProps)(TopBar);
