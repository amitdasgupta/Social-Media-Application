/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const socketIO = require('socket.io');

const socketHelpers = {
  connect: (server) => {
    const io = new socketIO.Server(server, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });
    io.use((socket, next) => {
      const {
        handshake: { auth },
      } = socket;
      if (!auth) {
        return next(new Error('invalid user'));
      }
      socket.auth = auth;
      next();
    });

    //   io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }));
    io.on('connection', (socket) => {
      global.socket = socket;
      socketHelpers.emitEvents(socket, io);
      socketHelpers.receiveEvents(socket);
      socket.on('disconnect', () => {
        console.log('User disconneted', socket.id);
      });
    });
  },
  emitEvents: (socket, io) => {
    socketHelpers.emitOnlineUsers(socket, io);
  },
  receiveEvents: (socket) => {
    socketHelpers.followNotification(socket);
  },
  emitOnlineUsers: (socket, io) => {
    const users = {};
    for (const [id, socketInstance] of io.of('/').sockets) {
      const key = socketInstance.auth.id;
      users[key] = id;
    }
    socket.emit('users', users);
  },
  followNotification: (socket) => {
    socket.on('userFollowed', (socketId) => {
      socket.to(socketId).emit('followNotification', {
        data: {
          ...socket.auth,
        },
      });
    });
  },
};

module.exports = socketHelpers;
