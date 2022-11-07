const { redis } = require('../../datastores');

async function alive(req, res) {
  const redisInstance = await redis.getRedisClient();
  const value = await redisInstance.ping();
  await redis.setAsync('testing', value, 1000);
  const redisReturn = await redis.getAsync('testing');
  res.send(redisReturn);
}

module.exports = {
  alive,
};
