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
    });
  },
  emitEvents: (socket, io) => {
    socketHelpers.emitOnlineUsers(socket, io);
    socketHelpers.emitUserConnected(socket);
  },
  receiveEvents: (socket) => {
    socketHelpers.followNotification(socket);
    socketHelpers.disconnectedEvent(socket);
    socketHelpers.postLikeEvent(socket);
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
        data: socket.auth,
      });
    });
  },
  disconnectedEvent: (socket) => {
    socket.on('disconnect', () => {
      socket.broadcast.emit('userDisconnected', {
        data: socket.auth,
      });
    });
  },
  emitUserConnected: (socket) => {
    socket.broadcast.emit('userJoined', {
      data: { ...socket.auth, socketId: socket.id },
    });
  },
  postLikeEvent: (socket) => {
    socket.on('postLiked', ({ userSocketId, postId }) => {
      socket.to(userSocketId).emit('postLikedNotification', {
        data: {
          auth: socket.auth,
          postId,
        },
      });
    });
  },
};

module.exports = socketHelpers;
