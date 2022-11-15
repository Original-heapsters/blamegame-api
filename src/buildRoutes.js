const { alive } = require('./debug/routeHandlers/alive');
const { seed } = require('./debug/routeHandlers/seed');
const { checkKey } = require('./debug/routeHandlers/checkKey');
const { checkSet } = require('./debug/routeHandlers/checkSet');
const { signUp } = require('./authentication/routeHandlers/signUp');
const { signIn } = require('./authentication/routeHandlers/signIn');
const { local } = require('./hooks/routeHandlers/local');
const { updateGame } = require('./games/routeHandlers/updateGame');

function buildRoutes(app) {
  // Health checks
  app.get('/alive', alive);
  app.get('/debug/seed', seed);
  app.get('/debug/redis/key', checkKey);
  app.get('/debug/redis/set', checkSet);

  // Authentication
  app.post('/signUp', signUp);
  app.post('/signIn', signIn);

  // Game
  app.patch('/game/:name', updateGame);

  // Hook processing
  app.post('/hooks/local', local);
}

module.exports = {
  buildRoutes,
};
