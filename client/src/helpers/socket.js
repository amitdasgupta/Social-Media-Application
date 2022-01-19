import { io } from 'socket.io-client';
const URL = 'http://localhost:5000';
const socket = io(URL);
// socket.on('connect', () => {
//   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
// });
socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
