const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { redis } = require('../../datastores');

const { TOKEN_KEY, DEFAULT_TOKEN_TTL } = process.env;

async function signIn({ username, email, password }) {
  if (!username) {
    return { error: 'Username is required' };
  }

  if (!email) {
    return { error: 'Email is required' };
  }

  if (!password) {
    return { error: 'Password is required' };
  }

  const existingUser = await redis.getAsync(`users:${username}`);
  if (!existingUser) {
    return { error: 'Registered account not found' };
  }
  const passHash = existingUser.password || '';
  const passMatch = await bcrypt.compare(password, passHash);
  if (existingUser && passMatch) {
    const token = jwt.sign(
      { username, email },
      TOKEN_KEY,
      { expiresIn: DEFAULT_TOKEN_TTL },
    );
    existingUser.token = token;
    return { user: existingUser };
  }
  return { info: 'Invalid credentials' };
}

module.exports = {
  signIn,
};
