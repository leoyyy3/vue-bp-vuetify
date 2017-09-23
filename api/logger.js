const winston = require('winston');
const level = process.env.LOG_LEVEL || 'debug';

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: () => { return new Date().toISOString(); }
        }),
        new winston.transports.File({
            level: level,
            timestamp: () => { return new Date().toISOString(); },
            filename: 'error.log'
        })
    ]
});

module.exports = logger;