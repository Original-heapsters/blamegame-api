const operations = require('../operations');
const { logger } = require('../../logger');

async function signUp(req, res) {
  const result = await operations.signUp(req.body);
  if ('error' in result) {
    logger.error(`Sign up error: ${result.error}`);
  }

  return res.json(result);
}

module.exports = {
  signUp,
};
