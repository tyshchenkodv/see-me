module.exports = class Database {
    constructor({ config }) {
        this.config = config;
        return require('knex')({
            client: 'pg',
            connection: this.config.getConfig('CONNECTION'),
        });
    }
}
