const operations = require('../operations');
const { logger } = require('../../logger');

async function getPlayers(req, res) {
  const result = await operations.getPlayers(req.params);
  if ('error' in result) {
    logger.error(`Get players error: ${result.error}`);
  }

  return res.json(result);
}

module.exports = {
  getPlayers,
};
