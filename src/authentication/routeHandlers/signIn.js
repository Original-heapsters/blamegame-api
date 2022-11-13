const operations = require('../operations');
const { logger } = require('../../logger');

async function signIn(req, res) {
  const result = await operations.signIn(req.body);
  if ('error' in result) {
    logger.error(`Sign in error: ${result.error}`);
  }

  return res.json(result);
}

module.exports = {
  signIn,
};
