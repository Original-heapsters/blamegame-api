const { v4: uuidv4 } = require('uuid');
const { redis } = require('../../datastores');

async function getGames() {
  const gameList = await redis.getKeysUnderPrefix('games:*');
  const filtered = new Set(gameList.map((game) => game.split(':')[1]));
  const formatted = [...filtered].map((gameName) => ({
    id: uuidv4(),
    name: gameName,
  }));

  return formatted;
}

module.exports = {
  getGames,
};
