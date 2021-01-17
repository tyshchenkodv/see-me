const bcrypt = require('bcrypt');
const DIContainer = require('../services/DIContainer');
const db = DIContainer.resolve('db');

module.exports = {
    signup: async (req, res, next) => {
        try {
            await db('users')
                .insert({
                    firstName: req.body.firstName,
                    secondName: req.body.secondName,
                    email: req.body.email,
                    phone: req.body.phone,
                    university: req.body.university,
                    password: bcrypt.hashSync(req.body.password, 8),
                });
        }catch (error){
            const InternalErrorException = req.container.resolve('internalErrorException');
            return next(new InternalErrorException(error));
        }

        return res.status(201).send({message: 'User was registered!'});
    },
}
