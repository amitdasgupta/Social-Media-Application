import styles from '../../stylesheets/pages/Rightbar.module.scss';
import Notifications from '../../components/Notifications.js';
import Onlineuser from '../../components/OnlineUser';
import { useSocket } from '../../contexts/socketProvider';
import { useEffect } from 'react';

function Rightbar(props) {
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
    <div className={styles.rightBarMain}>
      <div className={styles.content}>
        <div className={styles.heading}>Notifications</div>
        <Notifications />
        <div className={styles.heading}>Online Users</div>
        <Onlineuser />
      </div>
    </div>
  );
}

export default Rightbar;
