const fs = require('fs');
const path = require('path');
const playSound = require('play-sound');
const { logger } = require('../logger');

const { ENABLE_SERVER_SOUND } = process.env;

function getRandomAudioFile() {
  const audioDir = path.join(__dirname, '../public/audio');
  logger.debug(`AudioDir: ${audioDir}`);
  const files = fs.readdirSync(audioDir);
  const chosenFile = files[Math.floor(Math.random() * files.length)];
  if (ENABLE_SERVER_SOUND) {
    const localPath = path.join(audioDir, chosenFile);
    logger.debug(`Playing audio at ${localPath}`);
    const player = playSound({});
    player.play(localPath);
  }

  return {
    file: chosenFile,
    extPath: `/audio/${chosenFile}`,
  };
}

module.exports = {
  getRandomAudioFile,
};
