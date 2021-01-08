const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).send({
        post1: 'post1',
        post2: 'post2',
    });
});
router.post('/', (req, res) => {
    return res.status(201).send({
        message: 'Post added',
    });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    return res.status(200).send({
        post: `post${id}`,
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
