require('dotenv').config({ path: '.env.default' });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);
const { alive } = require('./healthcheck');
const { signUp } = require('./authentication');
const { createGame } = require('./games');

const { PORT, HOST } = process.env;

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.post('/signUp', signUp);

app.get('/alive', alive);

createGame(io);

server.listen(PORT, HOST);
