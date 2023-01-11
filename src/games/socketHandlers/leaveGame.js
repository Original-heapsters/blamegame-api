const operations = require('../operations');

function leaveGame(io) {
  io.on('connection', (socket) => {
    operations.leaveGame(socket);
  });
}

module.exports = {
  leaveGame,
};
