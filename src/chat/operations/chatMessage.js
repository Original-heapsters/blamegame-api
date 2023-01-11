const { v4: uuidv4 } = require('uuid');
const { redis } = require('../../datastores');
const { logger } = require('../../logger');

async function chatMessage(socket, io) {
  socket.on('chatMessage', async ({ game, user, msg }) => {
    logger.debug(`${user} sent message in ${game}: ${msg}`);
    const fullMessage = {
      id: uuidv4(),
      type: 'chat',
      player: user,
      game,
      message: msg,
      date: Date.now(),
    };

    await redis.pushToLimList(`games:${game}:chat`, fullMessage);
    logger.debug(`Emitting ${JSON.stringify(fullMessage)} to ${game}`);
    io.emit(game, fullMessage);
  });
}

module.exports = {
  chatMessage,
};
