import {
  Input,
  InputAdornment,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Box } from '@material-ui/system';
import { useEffect } from 'react';
import styles from '../../stylesheets/components/Search.module.scss';
import { useSocket } from '../../contexts/socketProvider';

export default function SearchComponent(props) {
  const socket = useSocket();
  const { isSocketConnected, connectSocket, userData, socketExist } = props;
  useEffect(() => {
    if (!isSocketConnected && socket !== null) {
      socket.auth = {
        username: userData.username,
        id: userData._id,
      };
      connectSocket(socket);
    }
  }, [isSocketConnected, socket, connectSocket, socketExist, userData]);
  return (
    <Box className={styles.main}>
      <FormControl variant="standard" className={styles.search}>
        <InputLabel htmlFor="input-with-icon-adornment">Search here</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}
