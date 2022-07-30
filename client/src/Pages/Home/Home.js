import React, { useEffect } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import Feed from '../Feed';
import NotificationsComponent from '../../components/Notifications';
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
import SocketConnection from '../../components/SocketConnection';

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

function giveSelectedTab() {
  const value = window.location.pathname;
  switch (value) {
    case '/app':
      return 0;
    case '/app/notifications':
      return 1;
    case '/app/people':
      return 2;
    case '/app/messages':
      return 3;
    default:
      return 0;
  }
}

function returnTabComponent(value, index) {
  let component = null;
  switch (index) {
    case 0:
      component = (
        <>
          <SearchComponent /> <Feed />
        </>
      );
      break;
    case 1:
      component = (
        <>
          <NotificationsComponent />
        </>
      );
      break;
    case 2:
      component = (
        <>
          <SearchComponent /> <UserList />
        </>
      );
      break;
    case 3:
      component = (
        <>
          <div>Implement Chatting here</div>;
        </>
      );
      break;
    default:
      component = (
        <>
          <SearchComponent /> <Feed />
        </>
      );
  }
  return () => (
    <TabPanel value={value} index={index}>
      {component}
    </TabPanel>
  );
}

export default function Home(props) {
  const [value, setValue] = React.useState(giveSelectedTab());
  const [deviceWidth] = useWindowSize();
  const {
    loggedInUser: { isFetched },
    getLoggedInUserData,
    notificationCount,
    getAllNotifications,
  } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (!isFetched) getLoggedInUserData();
  }, [getLoggedInUserData, isFetched]);
  useEffect(() => {
    getAllNotifications();
  }, [getAllNotifications]);
  let { path, url } = useRouteMatch();
  return isFetched ? (
    <SocketProvider>
      <SocketConnection />
      <div className={styles.tabParent}>
        <div className={styles.tabContent}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant={deviceWidth < 550 ? 'scrollable' : 'fullWidth'}
            centered={deviceWidth >= 550}
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
              component={Link}
              to={`${url}`}
            />
            <Tab
              icon={
                <div className={styles.topBarIcon}>
                  <Notifications className={styles.topBarIconImage} />
                  <span className={styles.topBarIconBadge}>
                    {notificationCount}
                  </span>
                </div>
              }
              label="Notifications"
              component={Link}
              to={`${url}/notifications`}
            />
            <Tab
              icon={
                <div className={styles.topBarIcon}>
                  <GroupsIcon className={styles.topBarIconImage} />
                </div>
              }
              label="People"
              component={Link}
              to={`${url}/people`}
            />
            <Tab
              icon={
                <div className={styles.topBarIcon}>
                  <Chat className={styles.topBarIconImage} />
                  <span className={styles.topBarIconBadge}>1</span>
                </div>
              }
              label="Messages"
              component={Link}
              to={`${url}/messages`}
            />
          </Tabs>
        </div>

        <Switch>
          <Route exact path={`${path}`} render={returnTabComponent(value, 0)} />
          <Route
            exact
            path={`${path}/notifications`}
            render={returnTabComponent(value, 1)}
          />
          <Route
            exact
            path={`${path}/people`}
            render={returnTabComponent(value, 2)}
          />
          <Route
            exact
            path={`${path}/messages`}
            render={returnTabComponent(value, 3)}
          />
        </Switch>
      </div>
    </SocketProvider>
  ) : (
    <div className={styles.contentSkeleton}>
      <Skeleton height={1200} />
    </div>
  );
}
