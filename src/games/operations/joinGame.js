const { redis } = require('../../datastores');

async function joinGame(socket) {
  socket.on('join', async ({ game, user }) => {
    const fullMessage = {
      player: user,
      game,
      message: `${user} joined ${game}`,
      date: Date.now(),
    };

    await redis.pushToLimList(`games:${game}:chat`, fullMessage);
    socket.join(game);
    socket.emit(game, fullMessage);
  });
}

module.exports = {
  joinGame,
};
