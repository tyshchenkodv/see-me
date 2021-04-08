const jwt = require('jsonwebtoken');
const DIContainer = require('../services/DIContainer');
const env = DIContainer.resolve('env');
const db = DIContainer.resolve('db');
const UnauthorizedException = DIContainer.resolve('unauthorizedException');

module.exports = async (req, res, next) => {
    try {
        const payload = jwt.verify(req.header('token'), env.get('SECRET'));

        if(payload){
            const user = await db('users').where({id: payload.id}).first();

            if(user){
                user.permissions = ['updateOwnArticle', 'deleteOwnArticle'];

                if (user.admin === true) {
                    user.permissions.push('updateAnyArticle', 'deleteAnyArticle');
                }

                req.user = user;
            }
        }

        next();
    } catch (error){
        return next(new UnauthorizedException(error));
    }
};
