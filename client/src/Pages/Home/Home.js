import React, { useEffect } from 'react';
import Feed from '../Feed';
import Rightbar from '../Rightbar';

export default function Home(props) {
  const { loggedInUser, getLoggedInUserData } = props;
  useEffect(() => {
    if (!loggedInUser.isFetched) getLoggedInUserData();
  }, []);
  return (
    <>
      <Feed />
      <Rightbar />
    </>
  );
}
