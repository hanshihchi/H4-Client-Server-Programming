import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); 

socket.on('connect', () => {
  console.log('connected to server');
});
socket.on('disconnect', () => {
  console.log('disconnected from server');
});
socket.on('error', (error) => {
  console.error('error from server', error);
});

export default socket;