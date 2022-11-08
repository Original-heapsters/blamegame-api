const operations = require('../operations');

async function updateGame(req, res) {
  const result = await operations.updateGame(req.params, req.body);

  return res.json(result);
}

module.exports = {
  updateGame,
};
