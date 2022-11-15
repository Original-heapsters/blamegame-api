const { redis } = require('../../datastores');

async function checkKey({ key }) {
  const redisReturn = await redis.getAsync(key);
  const client = await redis.getRedisClient();
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
  checkKey,
};
