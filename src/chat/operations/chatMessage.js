const { redis } = require('../../datastores');
const { logger } = require('../../logger');

const { DEFAULT_GAME_TTL } = process.env;

async function chatMessage(socket) {
  socket.on('chatMessage', ({ game, user, msg }) => {
    redis.setAsync(`games:${game.name}:chat`, msg, DEFAULT_GAME_TTL);
    logger.debug(`${user} sent message in ${game}: ${msg}`);
    // rebroadcast
    socket.emit();
  });
}

module.exports = {
  chatMessage,
};
