const { redis } = require('../datastores');

const { DEFAULT_GAME_TTL } = process.env;
function createGame(io) {
  io.on('connection', (socket) => {
    socket.on('create', async (game) => {
      const { name, ruleset } = game;
      const roomPrefix = 'games';
      await redis.setAsync(`${roomPrefix}:${name}`, '1', DEFAULT_GAME_TTL);
      await redis.setAsync(`${roomPrefix}:${name}:rules`, ruleset, DEFAULT_GAME_TTL);

      socket.join(name);
    });
  });
}

module.exports = {
  createGame,
};
