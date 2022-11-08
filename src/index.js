require('dotenv').config({ path: '.env.default' });
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const { PORT, HOST } = process.env;
const allowedOrigins = [`http://${HOST}:${PORT}`, '*'];

const options = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'null',
    methods: ['GET', 'POST'],
  },
});
const { buildRoutes } = require('./buildRoutes');
const { buildSockets } = require('./buildSockets');

buildRoutes(app);
buildSockets(io);

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

server.listen(PORT, HOST);
console.log(`Listening on ${HOST}:${PORT}`);
