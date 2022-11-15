const operations = require('../operations');

async function checkSet(req, res) {
  const result = await operations.checkSet(req.body);

  return res.json(result);
}

async function checkKey(req, res) {
  const result = await operations.checkKey(req.body);

  return res.json(result);
}

async function checkList(req, res) {
  const result = await operations.checkList(req.body);

  return res.json(result);
}

module.exports = {
  checkSet,
  checkKey,
  checkList,
};
