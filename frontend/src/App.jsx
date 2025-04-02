import { useEffect, useState } from 'react';
import socket from './socket/MySocket.js';

export default function App() {
  const [messageHistory, setMessageHistory] = useState([]);
  const [username, setUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [room, setRoom] = useState('Room 1');
  const [onlineUsers, setOnlineUsers] = useState([]);

  const handleSetUsername = (event) => {
    event.preventDefault();
    if (tempUsername.trim()) {
      setUsername(tempUsername);
      socket.emit('joinRoom', { username: tempUsername, room });
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const input = event.target.elements.msg;
    const message = input.value;
    socket.emit('message', { message });
    input.value = '';
  };

  useEffect(() => {
    // chat messages
    socket.on('message', (data) => {
      console.log('message from server', data);
      setMessageHistory((prevMessages) => [...prevMessages, data]);
    });

    // online users
    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });
  }, []);

  // For new users to set username and choose a room.
  if (!username) {
    return (
      <div>
        <h1>Socket.io Chat App</h1>
        <h2>Join a chat room</h2>
        <form onSubmit={handleSetUsername}>
          <p>Username</p>
          <input 
            type="text" 
            placeholder="Enter your username" 
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
          />
          <p>Chat Room</p>
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            <option value="Room 1">Room 1</option>
            <option value="Room 2">Room 2</option>
            <option value="Room 3">Room 3</option>
          </select>
          <button type="submit">Join Room</button>
        </form>
      </div>
    );
  }
  return (
    <>
      <h1>Socket.io Chat App</h1>
      <h2>Messages History</h2>
      <p><strong>Room:</strong> {room}</p>
      <ul>
        {messageHistory.map((msg, index) => (
          <li key={index}>
            [{msg.timestamp}] <strong>{msg.username}</strong>: {msg.message}
          </li>
        ))}
      </ul>

      <h3>Online Users ({onlineUsers.length})</h3>
      <ul>
        {onlineUsers.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      <p><strong>Current User:</strong> {username}</p>
      <form id="form" onSubmit={handleSendMessage}>
        <input id="input" autoComplete="off" name="msg" placeholder="Type your message here" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
