require('dotenv').config({ path: '.env.default' });
const express = require('express');
const { redis } = require('./datastores');

const app = express();
const { PORT, HOST } = process.env;

app.get('/', async (req, res) => {
  console.log('starting');
  const redisInstance = await redis.getRedis();
  console.log('got redis');
  await redisInstance.ping();
  res.send('Hello World!');
});

app.listen(PORT, HOST);
