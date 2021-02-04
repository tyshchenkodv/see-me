const jwt = require('jsonwebtoken');
const DIContainer = require('../services/DIContainer');
const auth = DIContainer.resolve('config').getConfig('AUTH');
const db = DIContainer.resolve('db');
const UnauthorizedException = DIContainer.resolve('unauthorizedException');

module.exports = async (req, res, next) => {
    try {

        const payload = jwt.verify(req.header('access_token'), auth.secret);

        if(payload){
            const user = await db('users').where({id: payload.id}).first();

            if(user){
                user.permissions = ['updateOwnPost', 'deleteOwnPost'];

                if (user.role === true) {
                    user.permissions.push('updateAnyPost', 'deleteAnyPost');
                }

                req.user = user;
            }
        }

        next();
    } catch (error){
        return next(new UnauthorizedException(error));
    }
};
