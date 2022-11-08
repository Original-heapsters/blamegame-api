const { alive } = require('./debug/routeHandlers/alive');

const { signUp } = require('./authentication/routeHandlers/signUp');
const { signIn } = require('./authentication/routeHandlers/signIn');

const { updateGame } = require('./games/routeHandlers/updateGame');

async function buildRoutes(app) {
  app.get('/alive', alive);

  app.post('/signUp', signUp);
  app.post('/signIn', signIn);

  app.patch('/game/:name', updateGame);
}

module.exports = {
  buildRoutes,
};
