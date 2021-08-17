import { connect } from 'react-redux';
import { getLoggedInUserData } from '../../redux/actions/userActions';
import Home from './Home';

const mapStateToProps = (state) => {
  const {
    user: { loggedInUser },
  } = state;
  return {
    loggedInUser,
  };
};

const mapDispatchToProps = {
  getLoggedInUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
