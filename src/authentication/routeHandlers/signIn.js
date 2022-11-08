const operations = require('../operations');

async function signIn(req, res) {
  const result = await operations.signIn(req.body);

  return res.json(result);
}

module.exports = {
  signIn,
};
