import React, { useEffect } from 'react';
import Feed from '../Feed';
import Rightbar from '../../components/Rightbar';
import Skeleton from 'react-loading-skeleton';
import styles from '../../stylesheets/pages/Home.module.scss';
import { SocketProvider } from '../../contexts/socketProvider';

export default function Home(props) {
  const {
    loggedInUser: { isFetched },
    getLoggedInUserData,
  } = props;
  useEffect(() => {
    if (!isFetched) getLoggedInUserData();
  }, [getLoggedInUserData, isFetched]);
  return isFetched ? (
    <SocketProvider>
      <Feed />
      <Rightbar />
    </SocketProvider>
  ) : (
    <div className={styles.contentSkeleton}>
      <Skeleton height={1200} />
    </div>
  );
}
