const { createGame } = require('./games/socketHandlers/createGame');
const { joinGame } = require('./games/socketHandlers/joinGame');

const { chatMessage } = require('./chat/socketHandlers/chatMessage');

function buildSockets(io) {
  createGame(io);
  joinGame(io);

  chatMessage(io);
}

module.exports = {
  buildSockets,
};
