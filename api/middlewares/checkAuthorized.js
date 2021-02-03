const DIContainer = require('../services/DIContainer');
const db = DIContainer.resolve('db');
const NotFoundException = DIContainer.resolve('notFoundException');
const UnauthorizedException = DIContainer.resolve('unauthorizedException');

module.exports = (tableName, columnName) => {
    return async (req, res, next) => {

        try {

            const post = await db(tableName).
                select('*').
                where(columnName, req.user.id).
                andWhere('id', req.params.id).first();

            if(!post){
                return next(new NotFoundException());
            }

            next();
        } catch (error){
            return next(new UnauthorizedException(error));
        }
    }
}
