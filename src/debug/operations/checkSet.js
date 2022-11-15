const { redis } = require('../../datastores');

async function checkSet({ key }) {
  const client = await redis.getRedisClient();
  const redisReturn = await client.smembers(key);
  const ttl = await client.ttl(key);
  const expireDate = new Date();
  expireDate.setSeconds(ttl);
  return {
    ...redisReturn,
    ttl,
    expireDate,
  };
}

module.exports = {
  checkSet,
};
