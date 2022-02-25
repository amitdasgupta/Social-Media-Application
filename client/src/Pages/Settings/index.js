import { connect } from 'react-redux';
import {
  getLoggedInUserData,
  updateUser,
} from '../../redux/actions/userActions';
import Settings from './Settings';

const mapStateToProps = (state) => {
  const {
    user: { loggedInUser, appUsers },
  } = state;

  const isAllUserDataFetched = loggedInUser?.isFetched;
  const userData = isAllUserDataFetched ? appUsers[loggedInUser.id] : {};
  return {
    userData,
    isAllUserDataFetched,
  };
};

const mapDispatchToProps = {
  getLoggedInUserData,
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
