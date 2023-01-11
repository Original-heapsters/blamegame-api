const operations = require('../operations');

function chatMessage(io) {
  io.on('connection', (socket) => {
    operations.chatMessage(socket, io);
  });
}

module.exports = {
  chatMessage,
};
