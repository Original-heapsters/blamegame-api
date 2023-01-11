const { v4: uuidv4 } = require('uuid');
const { redis, util } = require('../../datastores');

const baseRules = {
  pre_commit: {
    rule: 'Sip water',
    points: 1,
    cause: 'The pre-commit hook is run first, before you even type in a commit message.',
  },
  prepare_commit_msg: {
    rule: 'Sip water x2',
    points: 2,
    cause: 'The prepare-commit-msg hook is run before the commit message editor is fired up but after the default message is created.',
  },
  commit_msg: {
    rule: 'Sip water x3',
    points: 3,
    cause: 'The commit-msg hook takes one parameter, which again is the path to a temporary file that contains the commit message written by the developer.',
  },
  post_commit: {
    rule: 'Drink of relief',
    points: 4,
    cause: 'After the entire commit process is completed, the post-commit hook runs.',
  },
  applypatch_msg: {
    rule: 'Sip water',
    points: 5,
    cause: 'The first hook that is run in the email workflow is applypatch-msg.',
  },
  pre_applypatch: {
    rule: 'Sip water x2',
    points: 6,
    cause: 'The next hook to run when applying patches via git am is pre-applypatch.',
  },
  post_applypatch: {
    rule: 'Big drink',
    points: 7,
    cause: 'The last hook to run during a git am operation is post-applypatch, which runs after the commit is made.',
  },
  pre_rebase: {
    rule: 'Sip water',
    points: 8,
    cause: 'The pre-rebase hook runs before you rebase anything and can halt the process by exiting non-zero.',
  },
  post_rewrite: {
    rule: 'Take a shot',
    points: 9,
    cause: 'The post-rewrite hook is run by commands that replace commits, such as git commit --amend and git rebase.',
  },
  post_checkout: {
    rule: 'Finish drink',
    points: 10,
    cause: 'After you run a successful git checkout, the post-checkout hook runs.',
  },
  post_merge: {
    rule: 'Take a shot',
    points: 11,
    cause: 'The post-merge hook runs after a successful merge command.',
  },
  pre_push: {
    rule: 'Sip water in anticipation',
    points: 12,
    cause: 'The pre-push hook runs during git push, after the remote refs have been updated but before any objects have been transferred.',
  },
  pre_auto_gc: {
    rule: 'Lil sip',
    points: 13,
    cause: 'Git occasionally does garbage collection as part of its normal operation, by invoking git gc --auto. The pre-auto-gc hook is invoked just before the garbage collection takes place, and can be used to notify you that this is happening, or to abort the collection if now isn’t a good time.',
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
  password: 'test',
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
    points: 3,
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
  await redis.wipeKeys();
  await redis.setAsync('games:general', generalGame, DEFAULT_GAME_TTL);
  await redis.setAsync('games:blamegame_api', blamegame, DEFAULT_GAME_TTL);
  await redis.pushToLimList('games:general:chat', sampleHookMessage);
  await redis.pushToLimList('games:blamegame_api:chat', sampleHookMessage);
  await redis.pushToLimList('games:general:chat', sampleGeneralChatMessage);
  await redis.pushToLimList('games:blamegame_api:chat', sampleBGChatMessage);
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
