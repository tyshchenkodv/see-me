const DIContainer = require('../services/DIContainer');
const db = DIContainer.resolve('db');
const NotFoundException = DIContainer.resolve('notFoundException');
const BadRequestException = DIContainer.resolve('badRequestException');
const n = require('nested-knex');
const prepareComments = require('../services/prepareComments');

module.exports = {
    create: async (req, res, next) => {
        try {
            const data = req.body;

            await db('comments')
                .insert({
                    text: data.text,
                    date: data.date,
                    userId: data.userId,
                    articleId: data.articleId,
                    parentId: data.parentId
                });

            const comments = await n.array(
                n.type({
                    id: n.number('comments.id', { id: true }),
                    text: n.string('comments.text'),
                    date: n.date('comments.date'),
                    articleId: n.number("comments.articleId"),
                    user: n.type({
                        id: n.number("commentUser.id", { id: true }),
                        firstName: n.string("commentUser.firstName"),
                        secondName: n.string("commentUser.secondName"),
                        avatar: n.string("commentUser.avatar"),
                    }),
                    parentId: n.number("comments.parentId", { id: true }),
                })).withQuery(
                db.from("comments")
                    .leftJoin("users AS commentUser", "comments.userId","commentUser.id")
                    .where({articleId: data.articleId})
            );

            req.app.commentsClients.forEach(client => {
                client.send(JSON.stringify({
                    articleId: data.articleId,
                    commentsCount: comments.length,
                    comments: prepareComments(comments),
                }));
            });
        } catch (error) {
            return next(new BadRequestException(error));
        }

        return res.status(201).send();
    },
    delete: async (req, res, next) => {
        const { id } = req.params;

        const item = await db
            .select('*')
            .from('comments')
            .where('id', id)
            .first();

        if (!item) {
            return next(new NotFoundException());
        }

        await db('comments').where('id', id).del();

        const comments = await n.array(
            n.type({
                id: n.number('comments.id', { id: true }),
                text: n.string('comments.text'),
                date: n.date('comments.date'),
                articleId: n.number("comments.articleId"),
                user: n.type({
                    id: n.number("commentUser.id", { id: true }),
                    firstName: n.string("commentUser.firstName"),
                    secondName: n.string("commentUser.secondName"),
                    avatar: n.string("commentUser.avatar"),
                }),
                parentId: n.number("comments.parentId", { id: true }),
            })).withQuery(
            db.from("comments")
                .leftJoin("users AS commentUser", "comments.userId","commentUser.id")
                .where({articleId: item.articleId})
        );

        req.app.commentsClients.forEach(client => {
            client.send(JSON.stringify({
                articleId: item.articleId,
                commentsCount: comments.length,
                comments: prepareComments(comments),
            }));
        });

        return res.status(204).send();
    },
    update: async (req, res, next) => {
        const { id } = req.params;

        const item = await db
            .select('*')
            .from('comments')
            .where('id', id)
            .first();

        if (!item) {
            return next(new NotFoundException());
        }

        try {
            const data = req.body;
            delete data.id;
            await db('comments')
                .where('id', id)
                .update(data);

        } catch (error) {
            return next(new BadRequestException(error));
        }

        const comments = await n.array(
            n.type({
                id: n.number('comments.id', { id: true }),
                text: n.string('comments.text'),
                date: n.date('comments.date'),
                articleId: n.number("comments.articleId"),
                user: n.type({
                    id: n.number("commentUser.id", { id: true }),
                    firstName: n.string("commentUser.firstName"),
                    secondName: n.string("commentUser.secondName"),
                    avatar: n.string("commentUser.avatar"),
                }),
                parentId: n.number("comments.parentId", { id: true }),
            })).withQuery(
            db.from("comments")
                .leftJoin("users AS commentUser", "comments.userId","commentUser.id")
                .where({articleId: item.articleId})
        );

        req.app.commentsClients.forEach(client => {
            client.send(JSON.stringify({
                articleId: item.articleId,
                commentsCount: comments.length,
                comments: prepareComments(comments),
            }));
        });

        return res.status(204).send();
    },
}
