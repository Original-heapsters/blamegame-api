const { redis } = require('../datastores');

const { DEFAULT_GAME_TTL } = process.env;
async function joinGame(socket, game) {
  const { name } = game;
  const roomPrefix = 'games';
  await redis.setAsync(`${roomPrefix}:${name}`, '1', DEFAULT_GAME_TTL);

  socket.join(name);
}

module.exports = {
  joinGame,
};
