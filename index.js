import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const ioServer = new Server(server);

// frontend
app.use(express.static("frontend/dist"));

// track online users
let onlineUsers = {};

ioServer.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('joinRoom', ({ username, room }) => {
    socket.username = username;
    socket.room = room;
    socket.join(room);
    onlineUsers[socket.id] = { username, room };

    // notify the room
    const joinMessage = {
      username: 'System',
      message: `${username} has joined the room.`,
      timestamp: new Date().toISOString()
    };
    ioServer.to(room).emit('message', joinMessage);

    // update the online users
    const usersInRoom = Object.values(onlineUsers)
      .filter(user => user.room === room)
      .map(user => user.username);
    ioServer.to(room).emit('onlineUsers', usersInRoom);
  });

 
  socket.on('message', ({ message }) => {
    if (!socket.username || !socket.room) {
      return; // ignore messages from users not in a room
    }
    const fullMessage = {
      username: socket.username,
      message,
      timestamp: new Date().toISOString()
    };
    // broadcast the message only to users in the same room
    ioServer.to(socket.room).emit('message', fullMessage);
  });

  
  socket.on('disconnect', () => {
    if (socket.username && socket.room) {
      delete onlineUsers[socket.id];
      const leaveMessage = {
        username: 'System',
        message: `${socket.username} has left the room.`,
        timestamp: new Date().toISOString()
      };
      ioServer.to(socket.room).emit('message', leaveMessage);

      const usersInRoom = Object.values(onlineUsers)
        .filter(user => user.room === socket.room)
        .map(user => user.username);
      ioServer.to(socket.room).emit('onlineUsers', usersInRoom);
    }
    console.log('user disconnected', socket.id);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
