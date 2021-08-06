import React from 'react';
import TopBar from '../../components/Topbar/TopBar';
import Feed from '../Feed';
import Sidebar from '../../components/Sidebar';
import Rightbar from '../Rightbar';
import styles from '../../stylesheets/pages/Home.module.scss';

export default function Home() {
  return (
    <div>
      <TopBar />
      <div className={styles.mainContent}>
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
}
