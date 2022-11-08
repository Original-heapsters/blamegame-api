const operations = require('../operations');

function createGame(io) {
  io.on('connection', (socket) => {
    operations.createGame(socket);
  });
}

module.exports = {
  createGame,
};
