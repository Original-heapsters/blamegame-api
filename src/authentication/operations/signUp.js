const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { redis } = require('../../datastores');

const { DEFAULT_USER_TTL, TOKEN_KEY, DEFAULT_TOKEN_TTL } = process.env;

async function signUp({ username, email, password, profileUrl }) {
  if (!username) {
    return { error: 'Username is required' };
  }

  if (!email) {
    return { error: 'Email is required' };
  }

  if (!password) {
    return { error: 'Password is required' };
  }

  if (!profileUrl) {
    return { error: 'Profile Url is required' };
  }

  const existingUser = await redis.getAsync(`players:email:${email}`);

  if (existingUser) {
    return { error: 'User already exists. Login instead' };
  }

  const encryptedPass = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    email,
    password: encryptedPass,
    profileUrl,
  };

  await redis.setAsync(`players:email:${email}`, newUser, DEFAULT_USER_TTL);
  await redis.pushToList('games:general:emails', email);

  const token = jwt.sign(
    { username, email, profileUrl },
    TOKEN_KEY,
    { expiresIn: DEFAULT_TOKEN_TTL },
  );

  newUser.token = token;
  return newUser;
}

module.exports = {
  signUp,
};
