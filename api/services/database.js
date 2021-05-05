module.exports = class Database {
    constructor({ env }) {
        return require('knex')({
            client: 'pg',
            connection: {
                host: env.get('DB_HOST'),
                user: env.get('DB_USER'),
                password: env.get('DB_PASSWORD'),
                database: env.get('DB_NAME'),
            },
        });
    }
}
