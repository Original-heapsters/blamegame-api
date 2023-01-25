const operations = require('../operations');
const { logger } = require('../../logger');

async function signUp(req, res) {
  const result = await operations.signUp(req.body);
  if ('error' in result) {
    logger.error(`Sign up error: ${result.error}`);
  }

  const { token } = result;

  if (token) {
    const oneWeek = 7 * 24 * 3600 * 1000;
    res.cookie('token', token, { expires: new Date(Date.now() + oneWeek), maxAge: oneWeek, httpOnly: false, sameSite: 'none', secure: true });
  }

  return res.json(result);
}

module.exports = {
  signUp,
};
