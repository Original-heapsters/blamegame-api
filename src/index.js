require('dotenv').config({ path: '.env.default' });
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const { logger } = require('./logger');
const { buildRoutes } = require('./buildRoutes');
const { buildSockets } = require('./buildSockets');

const { PORT, HOST } = process.env;
const allowedOrigins = [`http://${HOST}:${PORT}`, '*', 'null', 'http://localhost:3001', 'http://localhost:3000', 'https://original-heapsters.github.io'];
const options = {
  origin: allowedOrigins,
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

const app = express();
app.use(cors(options));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
buildRoutes(app);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  },
});
buildSockets(io);
app.set('socketio', io);

server.listen(PORT, HOST);
logger.info(`Listening on ${HOST}:${PORT}`);
