const express = require('express');
const router = express.Router();
const NotFoundExceptions = require('./exceptions/NotFoundException');

router.get('/', (req, res) => {
    return res.send({
        code: 200,
        message: 'ok',
    });
});

router.get('/:name', (req, res, next) => {
    const { name } = req.params;

    if (name === 'error') {
        return next(new NotFoundExceptions());
    }

    return res.send({
        code: 200,
        message: `Hello ${name}`,
    });
});

module.exports = router;
