const { v4: uuidv4 } = require('uuid');
const { redis, util } = require('../../datastores');

const baseRules = {
  pre_commit: {
    rule: 'drink',
    points: 1,
    cause: 'First hook before commit process starts',
  },
  prepare_commit_msg: {
    rule: 'drink',
    points: 1,
    cause: 'Runs before commit editor opens and after default message is created',
  },
  commit_msg: {
    rule: 'drink',
    points: 1,
    cause: 'Runs when commit message opens',
  },
  post_commit: {
    rule: 'drink',
    points: 1,
    cause: 'Runs after commit process',
  },
  applypatch_msg: {
    rule: 'drink',
    points: 1,
  },
  pre_applypatch: {
    rule: 'drink',
    points: 1,
  },
  post_applypatch: {
    rule: 'drink',
    points: 1,
  },
  pre_rebase: {
    rule: 'drink',
    points: 1,
  },
  post_reqrite: {
    rule: 'drink',
    points: 1,
  },
  post_checkout: {
    rule: 'drink',
    points: 1,
  },
  post_merge: {
    rule: 'drink',
    points: 1,
  },
  pre_push: {
    rule: 'drink',
    points: 1,
  },
  pre_auto_gc: {
    rule: 'drink',
    points: 1,
  },
};

const generalGame = {
  ruleset: baseRules,
};

const blamegame = {
  ruleset: baseRules,
};

const testUser = {
  username: 'testUser',
  email: 'testEmail',
  password: 'nooo',
};

const testEmails = [
  'test@email.com',
  'sell_nat@yahoo.com',
];

const sampleHookMessage = {
  id: uuidv4(),
  type: 'hook',
  publicAudio: util.getRandomAudioFile().extPath,
  player: testUser,
  game: 'blamegame_api',
  consequence: {
    rule: 'drink',
    points: 1,
    cause: 'Runs when commit message opens',
  },
  hook: 'commit_msg',
  date: Date.now(),
};

const sampleBGChatMessage = {
  id: uuidv4(),
  type: 'chat',
  player: 'testUser',
  game: 'blamegame_api',
  message: 'This is a test message in blamegame_api',
  date: Date.now(),
};
const sampleGeneralChatMessage = {
  id: uuidv4(),
  type: 'chat',
  player: 'testUser',
  game: 'general',
  message: 'This is a test message in general',
  date: Date.now(),
};

const { DEFAULT_GAME_TTL } = process.env;
async function seed() {
  await redis.setAsync('games:general', generalGame, DEFAULT_GAME_TTL);
  await redis.setAsync('games:blamegame_api', blamegame, DEFAULT_GAME_TTL);
  await redis.pushToLimList('games:general:chat', sampleHookMessage);
  await redis.pushToLimList('games:blameGame_api:chat', sampleHookMessage);
  await redis.pushToLimList('games:general:chat', sampleGeneralChatMessage);
  await redis.pushToLimList('games:blameGame_api:chat', sampleBGChatMessage);
  testEmails.forEach(async (email) => {
    await redis.setAsync(`players:email:${email}`, testUser, DEFAULT_GAME_TTL);
    await redis.pushToList('games:general:emails', email);
    await redis.pushToList('games:blamegame_api:emails', email);
  });
  return generalGame;
}

module.exports = {
  seed,
};
