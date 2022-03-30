import { useEffect } from 'react';
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
  return null;
}
