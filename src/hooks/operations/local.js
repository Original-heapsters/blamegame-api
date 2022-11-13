const { redis, util } = require('../../datastores');

async function local({
  playerEmail,
  repoName,
  hookAction,
  io,
}) {
  const tempGame = {
    ruleset: {
      test: 'drink',
    },
    emails: [
      'test@email.com',
    ],
  };

  const tempUser = {
    email: 'test@email.com',
    username: 'sellnat77',
  };

  await redis.setAsync(`games:${repoName}`, tempGame, 180);
  await redis.setAsync('players:email:test@email.com', tempUser, 180);

  const game = await redis.getAsync(`games:${repoName}`);
  if (!game) {
    return { error: `Game not found for repo ${repoName}` };
  }

  const { ruleset, emails } = game;
  if (!ruleset) {
    return { error: `Ruleset not found for ${repoName}` };
  }
  if (!(hookAction in ruleset)) {
    return { error: `${hookAction} not found in ruleset for ${repoName}` };
  }

  if (!(emails.includes(playerEmail))) {
    return { error: `${playerEmail} not found in game ${repoName}` };
  }

  const user = await redis.getAsync(`players:email:${playerEmail}`);
  if (!user) {
    return { error: `Could not find user info for ${playerEmail}` };
  }

  const {
    extPath: externalAudioPath,
  } = util.getRandomAudioFile();

  const result = {
    publicAudio: externalAudioPath,
    player: user.username,
    game: repoName,
    consequence: ruleset[hookAction],
    date: Date.now(),
  };
  console.log(io);

  io.emit(repoName, result);

  return result;
}

module.exports = {
  local,
};
