import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CommentIcon from '@mui/icons-material/Comment';
import Paper from '@mui/material/Paper';
import Skeleton from 'react-loading-skeleton';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import OnlineUsers from './OnlineUsers';

function refreshMessages({ value, userIds }) {
  console.log(value);
  if (value === 1) return <OnlineUsers userIds={userIds} />;
  if (value === 0) return <div>Live users here</div>;
}

export default function Chat({ userIds, isFetched }) {
  const [value, setValue] = React.useState(0);
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      {isFetched ? (
        refreshMessages({ value, userIds })
      ) : (
        <Skeleton height={500} />
      )}
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Chats" icon={<CommentIcon />} />
          <BottomNavigationAction label="People" icon={<EmojiPeopleIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
