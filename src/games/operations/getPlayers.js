const { v4: uuidv4 } = require('uuid');
const { redis } = require('../../datastores');

async function getPlayers({ name }) {
  const playerList = await redis.getMembers(`games:${name}:emails`);
  const formatted = [...playerList].map((player) => ({
    id: uuidv4(),
    player,
  }));

  return formatted;
}

module.exports = {
  getPlayers,
};
