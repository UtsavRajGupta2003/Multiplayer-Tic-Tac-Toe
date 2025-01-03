# Multiplayer Tic Tac Toe

Multiplayer Tic Tac Toe is a real-time game application built using Socket.io, Node.js, and HTML/CSS/JavaScript. This project allows two players to connect over a network and play a classic game of Tic Tac Toe in their browsers.

---

## Features

- **Real-time gameplay**: Updates are instant for both players.
- **Multiplayer support**: Play with a friend over a local network or the internet.
- **Responsive design**: Works on both desktop and mobile browsers.
- **Interactive UI**: Clear indications of turns and game results.

---

## Technologies Used

- **Node.js**: Backend server.
- **Socket.io**: WebSocket library for real-time communication.
- **HTML/CSS/JavaScript**: Frontend design and logic.
- **Express.js**: Simplified HTTP server setup.

---

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- npm (comes with Node.js)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/multiplayer-tic-tac-toe.git
   cd multiplayer-tic-tac-toe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the server:**
   ```bash
   node server.js
   ```

4. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

```
multiplayer-tic-tac-toe/
├── public/
│   ├── index.html       # Game interface
│   ├── style.css        # Game styling
│   ├── script.js        # Frontend logic
├── server.js            # Main server file
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

---

## How It Works

1. **Player Connection**:
   - The first player to join creates a new game.
   - The second player joins using the same URL.

2. **Gameplay**:
   - Players take turns to place their marker (`X` or `O`) on the grid.
   - The game checks for a winner or a draw after every move.

3. **Game End**:
   - If a player wins or the game ends in a draw, both players are notified.
   - A "Play Again" option is provided.

---

## Game Logic

- The 3x3 grid is represented as a 2D array.
- Winning combinations are pre-defined:
  - Horizontal, vertical, or diagonal matches.
- Socket.io handles real-time communication between players:
  - Emits player moves to the server.
  - Broadcasts updated game states to all connected clients.

---

## Example Code

### Server (server.js):
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let players = [];

io.on('connection', (socket) => {
    if (players.length < 2) {
        players.push(socket.id);
        socket.emit('player-assign', { player: players.length });
    }

    socket.on('move', (data) => {
        socket.broadcast.emit('update', data);
    });

    socket.on('disconnect', () => {
        players = players.filter(player => player !== socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
```

### Client (script.js):
```javascript
const socket = io();

let player = 0;
socket.on('player-assign', (data) => {
    player = data.player;
    document.getElementById('player-info').innerText = `You are Player ${player}`;
});

socket.on('update', (data) => {
    const cell = document.getElementById(data.cell);
    cell.innerText = data.marker;
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.innerText) {
            const marker = player === 1 ? 'X' : 'O';
            cell.innerText = marker;
            socket.emit('move', { cell: cell.id, marker });
        }
    });
});
```

---

## Future Enhancements

- Add player authentication.
- Support for matchmaking and lobbies.
- Improved UI/UX.
- Add sound effects and animations.
- Mobile app version using frameworks like React Native.

---

## Contributions

Contributions are welcome! If you'd like to contribute, please:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- Thanks to the [Socket.io](https://socket.io/) community for their great resources and documentation.
