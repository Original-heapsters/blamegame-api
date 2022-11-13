const operations = require('../operations');
const { logger } = require('../../logger');

async function updateGame(req, res) {
  const result = await operations.updateGame(req.params, req.body);
  if ('error' in result) {
    logger.error(`Update game error: ${result.error}`);
  }

  return res.json(result);
}

module.exports = {
  updateGame,
};
