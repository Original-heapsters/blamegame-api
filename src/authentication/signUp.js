const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { redis } = require('../datastores');

const { DEFAULT_USER_TTL, TOKEN_KEY, DEFAULT_TOKEN_TTL } = process.env;

async function signUp(req, res) {
  // validate
  try {
    const { username, email, password } = req.body;
    if (!username) {
      res.status(400).send('Username is required');
    }

    if (!email) {
      res.status(400).send('Email is required');
    }

    if (!password) {
      res.status(400).send('Password is required');
    }

    const existingUser = await redis.getAsync(`users:${username}`);

    if (existingUser) {
      return res.status(409).send('User already exists. Login instead');
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      encryptedPass,
    };

    await redis.setAsync(`users:${username}`, newUser, DEFAULT_USER_TTL);

    const token = jwt.sign(
      { username, email },
      TOKEN_KEY,
      { expiresIn: DEFAULT_TOKEN_TTL },
    );

    newUser.token = token;
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
  }
  return true;
}

module.exports = {
  signUp,
};
