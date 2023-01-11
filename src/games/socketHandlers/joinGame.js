const operations = require('../operations');

function joinGame(io) {
  io.on('connection', (socket) => {
    operations.joinGame(socket, io);
  });
}

module.exports = {
  joinGame,
};
