const DIContainer = require('../services/DIContainer');
const db = DIContainer.resolve('db');
const ForbiddenExceptions = DIContainer.resolve('forbiddenExceptions');
const UnauthorizedException = DIContainer.resolve('unauthorizedException');

module.exports = (rules) => {
    return async (req, res, next) => {
        const { user } = req;
        const { id } = req.params;

        try {
            if (rules.some( async (rule) => {
                if (!rule.own) {
                    return user.permissions.includes(rule.permissions);
                }
                const post = await db(rule.own.table).
                select('*').
                where(rule.own.column, user.id).
                andWhere('id', id).first();

                if(!post){
                    return next(new ForbiddenExceptions());
                }

                return post && post[rule.own.column] === id;
            })) {
                return next();
            }
        } catch (error){
            return next(new UnauthorizedException(error));
        }
    }
}
