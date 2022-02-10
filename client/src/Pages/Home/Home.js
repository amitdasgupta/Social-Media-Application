import React, { useEffect } from 'react';
import Feed from '../Feed';
import Rightbar from '../../components/Rightbar';
import Skeleton from 'react-loading-skeleton';
import styles from '../../stylesheets/pages/Home.module.scss';
import { SocketProvider } from '../../contexts/socketProvider';
import SearchComponent from '../../components/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import UserList from '../../components/UserList';
import { DynamicFeed, Chat, Notifications } from '@material-ui/icons';
import GroupsIcon from '@mui/icons-material/Groups';
import useWindowSize from '../../hooks/useWindowSize';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div {...other}>
      {value === index && (
        <div>
          <Typography component={'span'}>{children}</Typography>
        </div>
      )}
    </div>
  );
}

export default function Home(props) {
  const [value, setValue] = React.useState(0);
  const [deviceWidth] = useWindowSize();
  const {
    loggedInUser: { isFetched },
    getLoggedInUserData,
  } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (!isFetched) getLoggedInUserData();
  }, [getLoggedInUserData, isFetched]);
  return isFetched ? (
    <SocketProvider>
      <SearchComponent />
      <div className={styles.tabParent}>
        <div className={styles.tabContent}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant={deviceWidth < 750 ? 'scrollable' : 'fullWidth'}
            centered={deviceWidth >= 750}
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab
              icon={
                <div className={styles.topBarIcon}>
                  <DynamicFeed className={styles.topBarIconImage} />
                </div>
              }
              label="Feed"
            />
            <Tab
              icon={
                <div className={styles.topBarIcon}>
                  <Notifications className={styles.topBarIconImage} />
                  <span className={styles.topBarIconBadge}>1</span>
                </div>
              }
              label="Notifications"
            />
            <Tab
              icon={
                <div className={styles.topBarIcon}>
                  <GroupsIcon className={styles.topBarIconImage} />
                </div>
              }
              label="People"
            />
            <Tab
              icon={
                <div className={styles.topBarIcon}>
                  <Chat className={styles.topBarIconImage} />
                  <span className={styles.topBarIconBadge}>1</span>
                </div>
              }
              label="Messages"
            />
          </Tabs>
        </div>

        <TabPanel value={value} index={0}>
          <Feed />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Rightbar />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserList />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div>Implement Chatting here</div>
        </TabPanel>
      </div>
    </SocketProvider>
  ) : (
    <div className={styles.contentSkeleton}>
      <Skeleton height={1200} />
    </div>
  );
}
