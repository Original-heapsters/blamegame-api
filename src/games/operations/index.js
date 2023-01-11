const { createGame } = require('./createGame');
const { joinGame } = require('./joinGame');
const { leaveGame } = require('./leaveGame');
const { getGames } = require('./getGames');
const { getGame } = require('./getGame');
const { getPlayers } = require('./getPlayers');

module.exports = {
  createGame,
  joinGame,
  leaveGame,
  getGames,
  getGame,
  getPlayers,
};
