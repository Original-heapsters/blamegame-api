require('dotenv').config({ path: '.env.default' });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'null',
    methods: ['GET', 'POST'],
  },
});
const { buildRoutes } = require('./buildRoutes');
const { buildSockets } = require('./buildSockets');

const { PORT, HOST } = process.env;

buildRoutes(app);
buildSockets(io);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, HOST);
