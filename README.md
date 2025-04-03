# H4-Client-Server-Programming

## Overview

This project is a simple real-time chat application built with a Node.js/Express/Socket.IO backend and a React (v19) + Vite frontend.

## Features

- **Real-time Messaging:**  
  - Users can send and receive messages instantly.
  - Each message displays the sender's username and a server-generated timestamp.

## Additional Features

- **Multiple Chat Rooms:**  
  - Users can select from different chat rooms (e.g., Room 1 - 3) when joining.
  - Messages are broadcast only within the selected room.

- **Online User List/Count:**  
  - The application maintains and displays a list of users currently online in the room.
  - The online user count is updated in real time as users join or leave.

- **Join/Leave Notifications:**  
  - System notifications are sent to the room when a user joins or leaves.
  - Notifications include the username of the user and the timestamp.

## Technologies Used

- **Backend:** Node.js, Express, Socket.IO
- **Frontend:** React (v19), Vite
- **Real-Time Communication:** Socket.IO

## Installation

### Prerequisites

- Node.js (version 14+ recommended)
- npm (or yarn)

### Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

3. **Set up the frontend:**

   ```bash
   cd frontend
   npm install
   ```

4. **Build the Frontend (for production):**

   ```bash
   npm run build
   ```

   This command creates the production files in the `frontend/dist` folder.

## Running the Application

### Production Mode

1. Build the frontend as shown above.
2. Return to the project root directory.
3. Start the server:

   ```bash
   node index.js
   ```

4. Open your browser and go to [http://localhost:3000](http://localhost:3000).

### Development Mode

- **Backend:** Run the server normally:

  ```bash
  node index.js
  ```

- **Frontend:** To take advantage of Vite’s hot-reloading, start the Vite dev server in the `frontend` folder:

  ```bash
  npm run dev
  ```

  *Note:* When using the Vite dev server, ensure the Socket.IO client can connect to the backend server (you may need to configure a proxy in `vite.config.js`).

## Project Structure

```
project-root/
├── frontend/
│   ├── index.html              # Entry HTML file for Vite
│   └── src/
│       ├── App.jsx             # Main React component with chat and UI logic
│       ├── main.jsx            # React application entry point
│       └── socket/
│           └── MySocket.js     # Socket.IO client connection setup
├── index.js                    # Express + Socket.IO backend server
```

## How It Works

### Backend (`index.js`)

- **Static File Serving:**  
  Serves the built frontend from `frontend/dist`.

- **Socket.IO Integration:**  
  - Listens for new connections.
  - Processes a `"joinRoom"` event to add a user to a specific room.
  - Handles `"message"` events by attaching the sender's username and a timestamp, and broadcasting the message to all users in the room.
  - Maintains an in-memory list of online users per room and updates clients when users join or disconnect.
  - Sends system notifications when a user joins or leaves.

### Frontend (`App.jsx`, `MySocket.js`)

- **User Interaction:**  
  - Users input a username and select a chat room before joining.
  - After joining, the chat interface displays:
    - The current room and online users.
    - A history of messages, including sender information and timestamps.
  - Users can type and send messages, which are emitted to the backend via Socket.IO.

- **Socket Connection:**  
  Managed in `MySocket.js`, the frontend establishes a connection with the Socket.IO server and listens for events like connection, disconnection, messages, and online user updates.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Resources
  - Socket.IO: https://socket.io/docs/v4/tutorial/introduction
  - **AI Usage:**
    - ChatGPT(4o/o3-mini-high)
      - Used for writing README.md
        - Prompt: write a README for my project including additional features: online user list/count, join/leave notifications, and multiple chat rooms
      - Used for debugging
        - Prompt: (code) (error) Please solve the error.
