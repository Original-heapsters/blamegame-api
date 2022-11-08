const operations = require('../operations');

async function alive(req, res) {
  const result = await operations.alive();

  return res.json(result);
}

module.exports = {
  alive,
};
