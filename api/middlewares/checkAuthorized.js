const DIContainer = require('../services/DIContainer');
const db = DIContainer.resolve('db');
const ForbiddenExceptions = DIContainer.resolve('forbiddenExceptions');
const UnauthorizedException = DIContainer.resolve('unauthorizedException');

module.exports = (tableName, columnName) => {
    return async (req, res, next) => {
        try {
            const post = await db(tableName).
                select('*').
                where(columnName, req.user.id).
                andWhere('id', req.params.id).first();

            if(!post){
                return next(new ForbiddenExceptions());
            }
            next();
        } catch (error){
            return next(new UnauthorizedException(error));
        }
    }
}
