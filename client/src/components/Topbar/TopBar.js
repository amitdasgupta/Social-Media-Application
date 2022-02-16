import styles from '../../stylesheets/components/TopBar.module.scss';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { logout } from '../../helpers/auth';
import { Avatar, Menu, MenuItem } from '@material-ui/core';
import Notification from '../Alerts/index';
import { Box } from '@material-ui/system';
import { useHistory } from 'react-router-dom';

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const menuItems = [
    { name: 'Profile', func: () => <Redirect to="/app/myprofile" /> },
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
          <div className={styles.title} onClick={() => history.push('/app')}>
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
            <Avatar
              onClick={handleClick}
              alt="Cindy Baker"
              className={styles.profilePic}
              src="https://avatars.githubusercontent.com/u/25057271?s=400&u=f475d749d61767325c66668e7adf165d5460c135&v=4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
