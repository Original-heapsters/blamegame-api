const { redis } = require('../../datastores');

async function getChatHistory({ name, start = 0, end = -1 }) {
  const key = `games:${name}:chat`;
  const chatLog = await redis.getList(key, start, end);

  return chatLog;
}

module.exports = {
  getChatHistory,
};
