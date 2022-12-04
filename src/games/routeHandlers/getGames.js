const operations = require('../operations');
const { logger } = require('../../logger');

async function getGames(req, res) {
  const result = await operations.getGames();
  if ('error' in result) {
    logger.error(`Get game error: ${result.error}`);
  }

  return res.json(result);
}

module.exports = {
  getGames,
};
