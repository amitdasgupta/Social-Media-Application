import React, { useEffect } from 'react';
import Feed from '../Feed';
import Rightbar from '../Rightbar';

export default function Home(props) {
  const { loggedInUser, getLoggedInUserData } = props;
  console.log(loggedInUser);
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
