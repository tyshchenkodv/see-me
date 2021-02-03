const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DIContainer = require('../services/DIContainer');
const mailer = DIContainer.resolve('mailer');
const db = DIContainer.resolve('db');
const auth = DIContainer.resolve('config').getConfig('AUTH');
const InternalErrorException = DIContainer.resolve('internalErrorException');
const BadRequestException = DIContainer.resolve('badRequestException');

module.exports = {
    async login (req, res, next) {
        const { email, password } = req.body;

        try {
            const errors = {};

            if (!email) {
                errors.login = {
                    message: 'Oops! Login invalid',
                };
            }
            if (!password) {
                errors.password = {
                    message: 'Oops! Password invalid',
                };
            }
            if (Object.keys(errors).length) {
                return next(new BadRequestException(errors));
            }

            const user = await db('users').where({
                email: email,
            }).first();

            if (!user) {
                return next(new BadRequestException({
                    email: {
                        message: 'Oops! User not found',
                    },
                }));
            }

            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                    },
                    auth.secret,
                    {
                        expiresIn: auth.expiresIn,
                    },
                );

                return res.status(200).send({
                    token,
                });
            }

            return next(new BadRequestException());
        } catch (error) {
            return next(new InternalErrorException());
        }
    },
    signup: async (req, res, next) => {
        const { email } = req.body;

        let user = await db('users').where({
            email,
        }).first();

        if(user) {
            return next(new BadRequestException('Email already exists!'))
        }

        try {
            await db('users')
                .insert({
                    firstName: req.body.firstName,
                    secondName: req.body.secondName,
                    email: email,
                    phone: req.body.phone,
                    university: req.body.university,
                    password: bcrypt.hashSync(req.body.password, 8),
                    verified: false,
                });
        }catch (error){
            return next(new InternalErrorException(error));
        }

        user = await db('users').where({
            email,
        }).first();

        const link = `http://${DIContainer.resolve('config').getConfig('NODE_HOST')}/auth/verify/` + user.id;
        const message = `Hello,<br> Please Click on the link to verify your email.<br><a href='${link}'>Click here to verify</a>`;

        await mailer.send(email, 'Please confirm your email', message);

        return res.status(201).send({message: 'User was registered!'});
    },
    async verify(req, res) {
        const { id } = req.params;
        await db('users').where({id}).update({verified: true});

        return res.redirect(`${DIContainer.resolve('config').getConfig('FRONT_HOST')}/login`);
    },
}