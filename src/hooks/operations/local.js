const { redis, util } = require('../../datastores');

async function local({
  playerEmail,
  repoName,
  hookAction,
  io,
}) {
  const game = await redis.getAsync(`games:${repoName}`);
  if (!game) {
    return { error: `Game not found for repo ${repoName}` };
  }

  const { ruleset } = game;
  if (!ruleset) {
    return { error: `Ruleset not found for ${repoName}` };
  }
  if (!(hookAction in ruleset)) {
    return { error: `${hookAction} not found in ruleset for ${repoName}` };
  }

  const userInGame = redis.existsInList(`games:${repoName}:emails`, playerEmail);
  if (!userInGame) {
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
    hook: hookAction,
    consequence: ruleset[hookAction],
    date: Date.now(),
  };

  io.emit(repoName, result);

  return result;
}

module.exports = {
  local,
};