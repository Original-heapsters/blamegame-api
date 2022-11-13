const winston = require('winston');

const { LOG_LEVEL } = process.env;

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

module.exports = {
  logger,
};
