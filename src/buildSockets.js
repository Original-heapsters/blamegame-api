const { createGame } = require('./games/socketHandlers/createGame');
const { joinGame } = require('./games/socketHandlers/joinGame');

const { chatMessage } = require('./chat/socketHandlers/chatMessage');

function buildSockets(io) {
  // Games
  createGame(io);
  joinGame(io);

  // Chat
  chatMessage(io);
}

module.exports = {
  buildSockets,
};
