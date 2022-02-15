import { connect } from 'react-redux';
import User from './User';
import { followUser, unFollowUser } from '../../../redux/actions/userActions';

const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps;
  const {
    user: { loggedInUser, followedUser, appUsers },
  } = state;

  const isFetched =
    loggedInUser?.isFetched && followedUser?.isFetched && appUsers[userId];
  const userData = appUsers[userId];
  const { data: followedUserList = [] } = followedUser;
  const followedUserMap = followedUserList.reduce((allData, data) => {
    allData[data] = true;
    return allData;
  }, {});
  const isFriend = followedUserMap[userId];
  return {
    isAllUserDataFetched: isFetched,
    userData,
    appUsers,
    isFriend,
    userId,
    loggedInUserId: loggedInUser.id,
  };
};

const mapDispatchToProps = {
  followUser,
  unFollowUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
