const { redis } = require('../../datastores');
const { logger } = require('../../logger');

async function chatMessage(socket) {
  socket.on('chatMessage', ({ game, user, msg }) => {
    logger.debug(`${user} sent message in ${game}: ${msg}`);
    const fullMessage = {
      player: user,
      game,
      message: msg,
      date: Date.now(),
    };

    redis.pushToLimList(`games:${game}:chat`, fullMessage);

    socket.emit(game, fullMessage);
  });
}

module.exports = {
  chatMessage,
};
