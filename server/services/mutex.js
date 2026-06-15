const {
    Mutex
} = require('async-mutex');

const mutex =
    new Mutex();

module.exports =
    mutex;