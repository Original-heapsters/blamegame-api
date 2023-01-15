const operations = require('../operations');
const { logger } = require('../../logger');

async function signIn(req, res) {
  const result = await operations.signIn(req.body);
  if ('error' in result) {
    logger.error(`Sign in error: ${result.error}`);
  }

  const { token } = result;

  await res.cookie('token', token, { maxAge: 1000 * 60 * 10, httpOnly: false });

  return res.json(result);
}

module.exports = {
  signIn,
};
