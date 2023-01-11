const { v4: uuidv4 } = require('uuid');
const { redis } = require('../../datastores');

async function leaveGame(socket, io) {
  socket.on('leave', async ({ game, user }) => {
    const fullMessage = {
      id: uuidv4(),
      type: 'chat',
      player: user,
      game,
      message: `${user} left ${game}`,
      date: Date.now(),
    };

    await redis.pushToLimList(`games:${game}:chat`, fullMessage);
    io.emit(game, fullMessage);
    socket.leave(game);
  });
}

module.exports = {
  leaveGame,
};
