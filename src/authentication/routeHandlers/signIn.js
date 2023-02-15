const operations = require('../operations');
const { logger } = require('../../logger');

async function signIn(req, res) {
  const result = await operations.signIn(req.body);
  if ('error' in result) {
    logger.error(`Sign in error: ${result.error}`);
  }

  const { token } = result;

  if (token) {
    const oneWeek = 7 * 24 * 3600 * 1000;
    res.cookie('token', token, { expires: new Date(Date.now() + oneWeek), maxAge: oneWeek, httpOnly: true, sameSite: 'none', secure: true });
  }

  return res.json(result);
}

module.exports = {
  signIn,
};
