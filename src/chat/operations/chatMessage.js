const { redis } = require('../../datastores');

const { DEFAULT_GAME_TTL } = process.env;

async function chatMessage(socket) {
  socket.on('chatMessage', ({ game, user, msg }) => {
    // save
    redis.setAsync(`games:${game.name}:chat`, msg, DEFAULT_GAME_TTL);
    console.log(game);
    console.log(user);
    console.log(msg);

    // rebroadcast
    socket.emit();
  });
}

module.exports = {
  chatMessage,
};
