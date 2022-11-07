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
  return value;
}

async function setAsync(key, value, ttl = 1000) {
  const client = getRedisClient();

  await client.setex(key, ttl, value);
}

module.exports = {
  getRedisClient,
  getAsync,
  setAsync,
};
