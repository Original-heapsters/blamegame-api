const operations = require('../operations');
const { logger } = require('../../logger');

async function signUp(req, res) {
  const result = await operations.signUp(req.body);
  if ('error' in result) {
    logger.error(`Sign up error: ${result.error}`);
  }

  const { token } = result;

  if (token) {
    res.cookie('token', token, { maxAge: 1000 * 60 * 10, httpOnly: false, sameSite: 'none', secure: true });
  }

  return res.json(result);
}

module.exports = {
  signUp,
};
