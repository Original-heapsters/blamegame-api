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

async function checkList({ key }) {
  const client = await redis.getRedisClient();
  const listItems = await redis.getList(key, 0, -1);
  const ttl = await client.ttl(key);
  const expireDate = new Date();
  expireDate.setSeconds(ttl);
  return {
    listItems,
    ttl,
    expireDate,
  };
}

module.exports = {
  checkKey,
  checkSet,
  checkList,
};
