const { createGame } = require('./games/socketHandlers/createGame');
const { joinGame } = require('./games/socketHandlers/joinGame');
const { leaveGame } = require('./games/socketHandlers/leaveGame');

const { chatMessage } = require('./chat/socketHandlers/chatMessage');

function buildSockets(io) {
  // Games
  createGame(io);
  joinGame(io);
  leaveGame(io);

  // Chat
  chatMessage(io);
}

module.exports = {
  buildSockets,
};
