const operations = require('../operations');
const { logger } = require('../../logger');

async function local(req, res) {
  const io = req.app.get('socketio');
  const result = await operations.local({ ...req.body, io });
  if ('error' in result) {
    logger.error(`Local hook error: ${result.error}`);
  }

  return res.json(result);
}

module.exports = {
  local,
};
