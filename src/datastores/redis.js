const Redis = require('ioredis');

const {
  REDIS_PORT,
  REDIS_HOST,
  // REDIS_UNAME,
  // REDIS_PWORD,
  REDIS_DB,
} = process.env;

let datastoreRedis = null;

async function getRedis() {
  console.log(`Checking ${datastoreRedis}`);
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
  await datastoreRedis.setex('test', 100, 'yomomma');
  const test = await datastoreRedis.get('test');
  console.log(test);

  return datastoreRedis;
}

module.exports = {
  getRedis,
};
