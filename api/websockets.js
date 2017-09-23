const sio = require('socket.io');
const logger = require('./logger');

exports.initialize = app => {
    io = sio(app);

    io.on('connection', socket => {
        logger.info('Socket connected...');

        socket.on('disconnect', socket => {
            logger.info('Socket disconnected...');
        });
    })
}