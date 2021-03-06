/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import styles from '../../stylesheets/components/UserList.module.scss';
import User from './User';
import Skeleton from 'react-loading-skeleton';
import useInfiniteScrolling from '../../hooks/useInfiniteScrolling';

function Sidebar(props) {
  const {
    isLoggedInUserDataFetched = false,
    getAllUsersData,
    isLoading,
    isNextLoading,
    pageNo,
    isAllUserFetched,
  } = props;

  useEffect(() => {
    if (isLoggedInUserDataFetched && pageNo === 0 && !isAllUserFetched) {
      getAllUsersData();
    }
  }, [isLoggedInUserDataFetched, getAllUsersData, isLoading]);

  const [lastPostElementRef, isNextFetched, setNextFetched] =
    useInfiniteScrolling(isLoading);

  useEffect(() => {
    if (isNextFetched) {
      getAllUsersData();
      setNextFetched(false);
    }
  }, [isNextFetched, getAllUsersData, setNextFetched]);

  const giveFriendList = () => {
    const { appUsers } = props;
    return Object.keys(appUsers).map((userId) => {
      const jsx = <User key={`name-${userId}`} userId={userId} />;
      return jsx;
    });
  };

  return (
    <div className={styles.sideBarMain}>
      {isLoading ? (
        <Skeleton styles={styles.skeleton} height={400} count={5} />
      ) : (
        <>
          {' '}
          {giveFriendList()}
          {!isAllUserFetched && (
            <div key="last-ref-item" ref={lastPostElementRef}></div>
          )}
          <div className={styles.sideBarMain}>
            {isNextLoading && (
              <div styles={styles.skeleton}>
                <Skeleton styles={styles.skeleton} height={400} count={5} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
