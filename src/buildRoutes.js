const { alive } = require('./debug/routeHandlers/alive');

const { signUp } = require('./authentication/routeHandlers/signUp');
const { signIn } = require('./authentication/routeHandlers/signIn');

const { updateGame } = require('./games/routeHandlers/updateGame');

function buildRoutes(app) {
  // Health checks
  app.get('/alive', alive);

  // Authentication
  app.post('/signUp', signUp);
  app.post('/signIn', signIn);

  // Game
  app.patch('/game/:name', updateGame);
}

module.exports = {
  buildRoutes,
};
