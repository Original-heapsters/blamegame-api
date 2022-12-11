const { redis } = require('../../datastores');

async function getGame({ name }) {
  const game = await redis.getAsync(`games:${name}`);

  return game;
}

module.exports = {
  getGame,
};
