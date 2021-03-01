const DIContainer = require('../services/DIContainer');
const db = DIContainer.resolve('db');

module.exports = {
    list: async (req, res) => {
        const posts = await db.select('posts.id',
            'title',
            'text',
            'userId',
            'firstName',
            'secondName').from('posts')
                .innerJoin('users', 'users.id', 'posts.userId');

        return res.status(200).send({
            posts: posts,
        });
    },
    item: async (req, res, next) => {
        const { id } = req.params;

        const item = await db
            .select('*')
            .from('posts')
            .where('id', id)
            .first();

        if (!item) {
            const NotFoundException = req.container.resolve('notFoundException');
            return next(new NotFoundException());
        }

        return res.status(200).send({
            item,
        });
    },
    update: async (req, res, next) => {
        const { id } = req.params;

        const item = await db
            .select('*')
            .from('posts')
            .where('id', id)
            .first();

        if (!item) {
            const NotFoundException = req.container.resolve('notFoundException');
            return next(new NotFoundException());
        }

        try {

            const data = req.body;
            await db('posts')
                .where('id', id)
                .update(data);

        } catch (error) {
            const BadRequestException = req.container.resolve('badRequestException');
            return next(new BadRequestException(error));
        }

        return res.status(204).send();
    },
    delete: async (req, res, next) => {
        const { id } = req.params;

        const item = await db
            .select('*')
            .from('posts')
            .where('id', id)
            .first();

        if (!item) {
            const NotFoundException = req.container.resolve('notFoundException');
            return next(new NotFoundException());
        }

        await db('posts').where('id', id).del();

        return res.status(204).send();
    },
    create: async (req, res, next) => {
        try {
            const data = req.body;

            await db('posts')
                .insert(data);
        } catch (error) {
            const BadRequestException = req.container.resolve('badRequestException');
            return next(new BadRequestException(error));
        }

        return res.status(201).send();
    },
}
