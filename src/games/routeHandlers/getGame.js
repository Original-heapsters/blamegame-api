const operations = require('../operations');
const { logger } = require('../../logger');

async function getGame(req, res) {
  const result = await operations.getGame(req.params);
  if ('error' in result) {
    logger.error(`Get game error: ${result.error}`);
  }

  return res.json(result);
}

module.exports = {
  getGame,
};
