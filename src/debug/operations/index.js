const { alive } = require('./alive');
const { checkKey, checkSet, checkList } = require('./redis');
const { seed } = require('./seed');

module.exports = {
  alive,
  checkKey,
  checkSet,
  checkList,
  seed,
};
