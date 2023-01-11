const { v4: uuidv4 } = require('uuid');
const { redis } = require('../../datastores');

async function joinGame(socket, io) {
  socket.on('join', async ({ game, user }) => {
    const fullMessage = {
      id: uuidv4(),
      type: 'chat',
      player: user,
      game,
      message: `${user} joined ${game}`,
      date: Date.now(),
    };

    await redis.pushToLimList(`games:${game}:chat`, fullMessage);
    socket.join(game);
    io.emit(game, fullMessage);
  });
}

module.exports = {
  joinGame,
};
