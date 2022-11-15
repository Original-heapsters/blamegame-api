const Redis = require('ioredis');

const {
  REDIS_PORT,
  REDIS_HOST,
  // REDIS_UNAME,
  // REDIS_PWORD,
  REDIS_DB,
} = process.env;

let datastoreRedis = null;

function getRedisClient() {
  if (datastoreRedis) {
    return datastoreRedis;
  }

  datastoreRedis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    // username: REDIS_UNAME,
    // password: REDIS_PWORD,
    db: REDIS_DB,
  });

  return datastoreRedis;
}

async function getAsync(key) {
  const client = getRedisClient();

  const value = await client.get(key);
  const parsedValue = JSON.parse(value);
  return parsedValue;
}

async function setAsync(key, value, ttl = 1000) {
  const client = getRedisClient();
  const stringifiedValue = JSON.stringify(value);

  await client.setex(key, ttl, stringifiedValue);
}

async function refreshExpireTime(key, ttl = 1000) {
  const client = getRedisClient();
  await client.expire(key, ttl);
}

async function pushToList(key, item) {
  const client = getRedisClient();
  await client.sadd(key, item);
}

async function existsInList(list, item) {
  const client = getRedisClient();
  const exists = await client.sismember(list, item);
  return exists > 0;
}

module.exports = {
  getRedisClient,
  getAsync,
  setAsync,
  refreshExpireTime,
  pushToList,
  existsInList,
};
