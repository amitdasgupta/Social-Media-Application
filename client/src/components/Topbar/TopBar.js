import styles from '../../stylesheets/components/TopBar.module.scss';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { logout } from '../../helpers/auth';
import { Avatar, Menu, MenuItem } from '@material-ui/core';
import Notification from '../Alerts/index';
import { Box } from '@material-ui/system';
import { useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

export default function TopBar(props) {
  const { isLoggedInUserDataFetched, userData: { profilepic } = {} } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const menuItems = [
    {
      name: 'Settings',
      func: () => history.push('/app/settings'),
    },
    { name: 'Logout', func: logout },
  ];
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.mainConatiner}>
      <Notification />
      <div className={styles.topBarContainer}>
        <div className={styles.topBarLeft}>
          <div
            className={styles.title}
            onClick={() => {
              history.push('/app');
              window.location.reload();
            }}
          >
            Socialize
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <Box>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {menuItems.map(({ name, func }) => (
                  <MenuItem
                    className={styles.menuItemStyle}
                    key={name}
                    onClick={func}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {isLoggedInUserDataFetched ? (
              <Avatar
                onClick={handleClick}
                alt="Cindy Baker"
                className={styles.profilePic}
                src={profilepic}
              />
            ) : (
              <Skeleton className={styles.profilePic} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
