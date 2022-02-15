import { useEffect } from 'react';
import styles from '../../stylesheets/components/UserList.module.scss';
import User from './User';

function Sidebar(props) {
  const {
    isLoggedInUserDataFetched = false,
    getAllUsersData,
    isAllUserDataFetched,
  } = props;

  useEffect(() => {
    if (isLoggedInUserDataFetched && !isAllUserDataFetched) {
      getAllUsersData();
    }
  }, [isLoggedInUserDataFetched, getAllUsersData, isAllUserDataFetched]);

  const giveFriendList = () => {
    const { appUsers } = props;
    return Object.keys(appUsers).map((userId) => {
      const jsx = <User key={`name-${userId}`} userId={userId} />;
      return jsx;
    });
  };

  return (
    <div className={styles.sideBarMain}>
      <div className={styles.sideBarMainBottom}>{giveFriendList()}</div>
    </div>
  );
}

export default Sidebar;
