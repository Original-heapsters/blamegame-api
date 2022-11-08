const { redis } = require('../../datastores');

const { DEFAULT_GAME_TTL } = process.env;
async function updateGame({ name }, { ruleset }) {
  const roomPrefix = 'games';
  await redis.setAsync(`${roomPrefix}:${name}`, '1', DEFAULT_GAME_TTL);
  await redis.setAsync(`${roomPrefix}:${name}:rules`, ruleset, DEFAULT_GAME_TTL);

  return {
    updatedGame: {
      name,
      ruleset,
    },
  };
}

module.exports = {
  updateGame,
};
