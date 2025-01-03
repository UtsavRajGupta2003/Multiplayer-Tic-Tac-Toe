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
│   ├── image        # Game interface
│   ├── css          # Game styling
│   ├── js           # Frontend logic
├── views                # Ejs Pages
|── app.js               # Main server file
|── package.json         # Project metadata and dependencies
├── package-lock.json    # Project metadata 
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
