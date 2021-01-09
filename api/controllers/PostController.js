const knex = require('../database');
const NotFoundException = require('./../exceptions/NotFoundException');
const BadRequestException = require('./../exceptions/BadRequestException');

module.exports = {
    list: async (req, res) => {
        const posts = await knex.select('*').from('posts');

        return res.status(200).send({
            posts: posts,
        });
    },
    item: async (req, res, next) => {
        const { id } = req.params;

        const item = await knex
            .select('*')
            .from('posts')
            .where('id', id)
            .first();

        if (!item) {
            return next(new NotFoundException());
        }

        return res.status(200).send({
            item,
        });
    },
    update: async (req, res, next) => {
        const { id } = req.params;

        const item = await knex
            .select('*')
            .from('posts')
            .where('id', id)
            .first();

        if (!item) {
            return next(new NotFoundException());
        }

        try {

            const data = req.body;
            await knex('posts')
                .where('id', id)
                .update(data);

        } catch (error) {

            return next(new BadRequestException(error));

        }

        return res.status(204).send();
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
        const item = await knex
            .select('*')
            .from('posts')
            .where('id', id)
            .first();

        if (!item) {
            return next(new NotFoundException());
        }

        await knex('posts').where('id', id).del();

        return res.status(204).send();
    },
    create: async (req, res, next) => {
        try {
            const data = req.body;

            await knex('posts')
                .insert(data);
        } catch (error) {

            return next(new BadRequestException(error));

        }

        return res.status(201).send();
    },
}
