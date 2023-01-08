const { alive } = require('./debug/routeHandlers/alive');
const { seed } = require('./debug/routeHandlers/seed');
const { checkKey, checkSet, checkList } = require('./debug/routeHandlers/redis');
const { signUp } = require('./authentication/routeHandlers/signUp');
const { signIn } = require('./authentication/routeHandlers/signIn');
const { getChatHistory } = require('./chat/routeHandlers/getChatHistory');
const { local } = require('./hooks/routeHandlers/local');
const { updateGame } = require('./games/routeHandlers/updateGame');
const { getPlayers } = require('./games/routeHandlers/getPlayers');
const { getGames } = require('./games/routeHandlers/getGames');
const { getGame } = require('./games/routeHandlers/getGame');

function buildRoutes(app) {
  // Health checks
  app.get('/alive', alive);
  app.get('/debug/seed', seed);
  app.get('/debug/redis/key', checkKey);
  app.get('/debug/redis/set', checkSet);
  app.get('/debug/redis/list', checkList);

  // Authentication
  app.post('/signUp', signUp);
  app.post('/signIn', signIn);

  // Game
  app.get('/games', getGames);
  app.get('/game/:name', getGame);
  app.patch('/game/:name', updateGame);
  app.get('/game/:name/players', getPlayers);

  // Chat
  app.get('/game/:name/chat', getChatHistory);

  // Hook processing
  app.post('/hooks/local', local);
}

module.exports = {
  buildRoutes,
};
