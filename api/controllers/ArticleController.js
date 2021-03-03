const DIContainer = require('../services/DIContainer');
const db = DIContainer.resolve('db');

module.exports = {
    list: async (req, res) => {
        const posts = await db.select('articles.id',
            'title',
            'text',
            'userId',
            'firstName',
            'secondName').from('articles')
                .innerJoin('users', 'users.id', 'articles.userId');

        return res.status(200).send({
            posts: posts,
        });
    },
    item: async (req, res, next) => {
        const { id } = req.params;

        const item = await db
            .select('*')
            .from('articles')
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
            .from('articles')
            .where('id', id)
            .first();

        if (!item) {
            const NotFoundException = req.container.resolve('notFoundException');
            return next(new NotFoundException());
        }

        try {

            const data = req.body;
            await db('articles')
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
            .from('articles')
            .where('id', id)
            .first();

        if (!item) {
            const NotFoundException = req.container.resolve('notFoundException');
            return next(new NotFoundException());
        }

        await db('articles').where('id', id).del();

        return res.status(204).send();
    },
    create: async (req, res, next) => {
        try {
            const data = req.body;

            await db('articles')
                .insert({
                    title: data.title,
                    text: data.text,
                    available: data.available,
                    userId: req.user.id,
                });
        } catch (error) {
            const BadRequestException = req.container.resolve('badRequestException');
            return next(new BadRequestException(error));
        }

        return res.status(201).send();
    },
}
