const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({
        code: 200,
        message: 'ok',
    });
});

router.get('/:name', (req, res) => {
    const { name } = req.params;
    return res.send({
        code: 200,
        message: `Hello ${name}`,
    });
});

module.exports = router;
