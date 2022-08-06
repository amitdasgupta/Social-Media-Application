import { connect } from 'react-redux';
import Chat from './Chat';

const mapStateToProps = (state) => {
  const {
    socket: { liveUsers: { isFetched = false, data } = {} } = {},
    user: {
      loggedInUser: { id: loggedInUserId },
    },
  } = state;
  const userIds = Object.keys(data).filter(
    (userId) => !!data[userId] && userId !== loggedInUserId
  );
  return {
    userIds,
    isFetched,
  };
};

export default connect(mapStateToProps)(Chat);
