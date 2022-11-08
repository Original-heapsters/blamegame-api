const operations = require('../operations');

async function signUp(req, res) {
  const result = await operations.signUp(req.body);

  return res.json(result);
}

module.exports = {
  signUp,
};
