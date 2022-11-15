const operations = require('../operations');

async function checkKey(req, res) {
  const result = await operations.checkKey(req.body);

  return res.json(result);
}

module.exports = {
  checkKey,
};
