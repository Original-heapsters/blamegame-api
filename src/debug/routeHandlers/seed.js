const operations = require('../operations');

async function seed(req, res) {
  const result = await operations.seed();

  return res.json(result);
}

module.exports = {
  seed,
};
