import styles from '../../stylesheets/components/TopBar.module.scss';
import { useState } from 'react';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Redirect } from 'react-router';
import { logout } from '../../helpers/auth';
import {
  Input,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core';

const menuItems = [
  { name: 'Profile', func: () => <Redirect to="/app/myprofile" /> },
  { name: 'Settings', func: () => <Redirect to="/app/settings" /> },
  { name: 'Logout', func: logout },
];

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.mainConatiner}>
      <div className={styles.topBarContainer}>
        <div className={styles.topBarLeft}>
          <div className="">Socialize</div>
        </div>
        <div className={styles.topBarCenter}>
          <div className={styles.searchBar}>
            <Input
              id="input-with-icon-adornment"
              className={styles.input}
              placeholder="Search friends,videos or posts"
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
              disableUnderline
            />
          </div>
        </div>
        <div className={styles.topBarRight}>
          <div className={styles.topBarLinks}>
            <span className={styles.topBarLink}>Homepage</span>
            <span className={styles.topBarLink}>Timeline</span>
          </div>
          <div className={styles.topBarIcons}>
            <div className={styles.topBarIcon}>
              <Person className={styles.topBarIconImage} />
              <span className={styles.topBarIconBadge}>1</span>
            </div>
            <div className={styles.topBarIcon}>
              <Chat className={styles.topBarIconImage} />
              <span className={styles.topBarIconBadge}>1</span>
            </div>
            <div className={styles.topBarIcon}>
              <Notifications className={styles.topBarIconImage} />
              <span className={styles.topBarIconBadge}>1</span>
            </div>
          </div>
        </div>
        <Avatar
          onClick={handleClick}
          alt="Cindy Baker"
          className={styles.profilePic}
          src="https://avatars.githubusercontent.com/u/25057271?s=400&u=f475d749d61767325c66668e7adf165d5460c135&v=4"
        />
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
      </div>
    </div>
  );
}
