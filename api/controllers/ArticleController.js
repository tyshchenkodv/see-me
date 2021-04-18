const DIContainer = require('../services/DIContainer');
const db = DIContainer.resolve('db');
const n = require('nested-knex');
const prepareComments = require('../services/prepareComments');

module.exports = {
    list: async (req, res) => {
        const posts = await n.array(
            n.type({
                id: n.number("articles.id", { id: true }),
                title: n.string("articles.title"),
                text: n.string("articles.text"),
                date: n.date("articles.date"),
                available: n.string("articles.available"),
                user: n.type({
                    id: n.number("articleUser.id", { id: true }),
                    firstName: n.string("articleUser.firstName"),
                    secondName: n.string("articleUser.secondName"),
                    avatar: n.string("commentUser.avatar"),
                }),
                comments: n.array(n.type({
                    id: n.number('comments.id', { id: true }),
                    text: n.string('comments.text'),
                    date: n.date('comments.date'),
                    user: n.type({
                        id: n.number("commentUser.id", { id: true }),
                        firstName: n.string("commentUser.firstName"),
                        secondName: n.string("commentUser.secondName"),
                        avatar: n.string("commentUser.avatar"),
                    }),
                    parentId: n.number("comments.parentId", { id: true }),
                }))
            }),
            ).withQuery(
                db.from("articles")
                    .leftJoin("users AS articleUser", "articles.userId", "articleUser.id")
                    .leftJoin("comments", "articles.id", "comments.articleId")
                    .leftJoin("comments AS subComment", "comments.parentId", "comments.id")
                    .leftJoin("users AS commentUser", "comments.userId","commentUser.id"),
            );


        return res.status(200).send({
            posts: posts.map((post) => ({
                ...post,
                commentsCount: post.comments.length,
                comments: prepareComments(post.comments),
            })),
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
