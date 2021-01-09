const Config = require('./config');

const config = new Config();
const connection = config.getConfig('CONNECTION');

module.exports = require('knex')({
    client: 'pg',
    connection: connection,
});