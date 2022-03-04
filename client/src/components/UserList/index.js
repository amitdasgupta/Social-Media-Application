import { connect } from 'react-redux';
import UserList from './UserList';
import {
  getAllUsersData,
  followUser,
  unFollowUser,
} from '../../redux/actions/userActions';

const mapStateToProps = (state) => {
  const {
    user: {
      loggedInUser,
      userSuggestion,
      followedUser,
      appUsers,
      metaData: { pageNo = 1, size = 10, total = 10 } = {},
    },
  } = state;

  const isLoading =
    (!userSuggestion?.isFetched || !followedUser?.isFetched) && pageNo === 1;

  const isLoggedInUserDataFetched = loggedInUser?.isFetched;

  const isNextLoading =
    (!userSuggestion?.isFetched || !followedUser?.isFetched) && pageNo > 1;

  const isAllUserFetched = pageNo * size >= total;

  return {
    isLoading,
    isLoggedInUserDataFetched,
    userSuggestion,
    followedUser,
    appUsers,
    loggedInUser,
    isNextLoading,
    isAllUserFetched,
    pageNo,
  };
};

const mapDispatchToProps = {
  getAllUsersData,
  followUser,
  unFollowUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
