const { redis } = require('../../datastores');

const generalGame = {
  ruleset: {
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
  },
};

const { DEFAULT_GAME_TTL } = process.env;
async function seed() {
  await redis.setAsync('games:general', generalGame, DEFAULT_GAME_TTL);
  return generalGame;
}

module.exports = {
  seed,
};
