import { connect } from 'react-redux';
import UserItem from './UserItem';
import { getSingleUser } from '../../../redux/actions/userActions';

const mapStateToProps = (state, ownProps) => {
  const {
    user: { appUsers },
  } = state;

  const { userId } = ownProps;

  const userData = appUsers[userId];
  const userFetched = !!userData;
  return {
    ...ownProps,
    userData,
    userFetched,
  };
};

const mapDispatchToProps = {
  getSingleUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserItem);
