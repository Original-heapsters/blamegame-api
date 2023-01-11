const operations = require('../operations');

function leaveGame(io) {
  io.on('connection', (socket) => {
    operations.leaveGame(socket, io);
  });
}

module.exports = {
  leaveGame,
};
