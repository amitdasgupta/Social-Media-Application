import React, { useEffect } from 'react';
import Feed from '../Feed';
import Rightbar from '../Rightbar';
import Skeleton from 'react-loading-skeleton';
import styles from '../../stylesheets/pages/Home.module.scss';

export default function Home(props) {
  const {
    loggedInUser: { isFetched },
    getLoggedInUserData,
  } = props;
  useEffect(() => {
    if (!isFetched) getLoggedInUserData();
  }, [getLoggedInUserData, isFetched]);
  return isFetched ? (
    <>
      <Feed />
      <Rightbar />
    </>
  ) : (
    <div className={styles.contentSkeleton}>
      <Skeleton height={1200} />
    </div>
  );
}
