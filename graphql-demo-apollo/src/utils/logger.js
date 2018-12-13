const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const path = require('path');

const logFormat = printf(msg => {
    return `${msg.timestamp} ${msg.level}: ${msg.message}`;
});

const logger = createLogger({
    level: process.env.LOG_LEVEL,
    format: combine(timestamp(), logFormat),
    transports: [
        //Console log
        new transports.Console(),
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        new transports.File({ filename: path.join(process.env.LOG_DIR, 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(process.env.LOG_DIR, 'combined.log')})
    ],
});

module.exports = logger;
