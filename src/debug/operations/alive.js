const { redis } = require('../../datastores');

async function alive() {
  const redisInstance = await redis.getRedisClient();
  const value = await redisInstance.ping();
  await redis.setAsync('testing', value, 1000);
  const redisReturn = await redis.getAsync('testing');
  return {
    redisAlive: redisReturn === 'PONG',
  };
}

module.exports = {
  alive,
};
