const operations = require('../operations');
const { logger } = require('../../logger');

async function getChatHistory(req, res) {
  const { name } = req.params;
  const { start, end } = req.query;
  const result = await operations.getChatHistory({ name, start, end });
  if ('error' in result) {
    logger.error(`Chat history error: ${result.error}`);
  }

  return res.json(result);
}

module.exports = {
  getChatHistory,
};
