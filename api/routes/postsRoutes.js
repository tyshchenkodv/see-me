const express = require('express');
const router = express.Router();
const Config = require('../config');

const config = new Config();
const connection = config.getConfig('CONNECTION');
const knex = require('knex')({
    client: 'pg',
    connection: connection,
});

router.get('/', async (req, res) => {
    const posts = await knex.select('*').from('posts');

    return res.status(200).send({
        posts: posts,
    });
});
router.post('/', (req, res) => {
    return res.status(201).send({
        message: 'Post added',
    });
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const post = await knex.select('*').from('posts').where('id', id);

    return res.status(200).send({
        post: post,
    });
});
router.put('/:id', (req, res) => {
    const { id } = req.params;
    return res.status(202).send({
        message: `Post ${id} updated`,
    });
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    return res.status(202).send({
        message: `Post ${id} deleted`,
    });
});

module.exports = router;
