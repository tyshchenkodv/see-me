const DIContainer = require('../services/DIContainer');
const db = DIContainer.resolve('db');
const env = DIContainer.resolve('env');

module.exports = {
    updateAvatar: async (req, res) => {
        const {id} = req.params;
        const user = await db('users').select('*').where('id', id).first();
        if (user) {
            try {
                await db('users')
                    .where('id', id)
                    .update({avatar: req.file.filename});

                return res.status(200).send();
            } catch (e) {
                console.log(e);
            }
        }
    },
    getAvatar: async (req, res) => {
        const {id} = req.params;
        const user = await db('users').select('*').where('id', id).first();
        const avatar = user?.avatar;

        res.sendFile(`${avatar}`, {root: env.get('IMAGE_ROOT_DIR')});
    },
}
