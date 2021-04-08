const jwt = require('jsonwebtoken');
const DIContainer = require('../services/DIContainer');
const db = DIContainer.resolve('db');
const env = DIContainer.resolve('env');
const NotFoundException = DIContainer.resolve('notFoundException');
const fs = require('fs');

module.exports = {
    getUserByToken: async (req, res, next) => {
        const token = req.header('token');
        const payload = jwt.verify(req.header('token'), env.get('SECRET'));

        if(payload){
            const user = await db('users').where({id: payload.id}).first();

            if(!user) {
                return next(new NotFoundException());
            }
            delete user.password;
            return res.status(200).send({
                user: user,
                token: token,
            });
        }
    },
    getUserById: async (req, res, next) => {
        const { id } = req.params;

        if (id !== 'edit') {
            const user = await db
                .select('*')
                .from('users')
                .where('id', id)
                .first();

            if (!user) {
                return next(new NotFoundException());
            }

            delete user.password;
            return res.status(200).send({
                user,
            });
        }
        return res.status(200).send();
    },
    updateUser: async (req, res) => {
        const { user } = req.body;
        const { id } = req.params;
        const oldUser = await db('users')
            .select('*')
            .where('id', id)
            .first();
        if (oldUser) {
            try {
                user.avatar = oldUser.avatar;

                await db('users')
                    .where('id', id)
                    .update(user);

                user.id = id;
                delete user.password;
                return res.status(200).send(user);
            } catch (e) {
                console.log(e);
            }
        }
    },
    updateAvatar: async (req, res) => {
        const { id } = req.params;

        const user = await db('users').select('*').where('id', id).first();
        if (user) {
            try {
                if(user.avatar !== null) fs.unlinkSync(`${env.get('IMAGE_ROOT_DIR')}/${user.avatar}`);

                await db('users')
                    .where('id', id)
                    .update({avatar: req.file.filename});

                const newUser = await db('users')
                    .select('*')
                    .where('id', id)
                    .first();
                return res.status(200).send(newUser);
            } catch (e) {
                console.log(e);
            }
        }
    },
    getAvatar: async (req, res) => {
        const { fileName } = req.params;
        res.sendFile(fileName, { root: env.get('IMAGE_ROOT_DIR') });
    },
}
