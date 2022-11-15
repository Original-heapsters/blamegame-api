const operations = require('../operations');

async function checkSet(req, res) {
  const result = await operations.checkSet(req.body);

  return res.json(result);
}

module.exports = {
  checkSet,
};
