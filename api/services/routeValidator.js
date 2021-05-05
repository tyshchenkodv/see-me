const DIContainer = require('./DIContainer');
const db = DIContainer.resolve('db');

module.exports = {
    isUnique: async function (tableName, columnName, value, id = null) {
        let item;
        if (id !== null) {
            item = await db(tableName).select('*').where({[columnName]: value}).whereNot('id', id).first();
        } else {
            item = await db(tableName).select('*').where({[columnName]: value}).first();
        }
        if (item) {
            throw `${columnName} already exists in ${tableName}`;
        }
    }
}
