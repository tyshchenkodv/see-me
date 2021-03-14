const { validationResult } = require('express-validator');

module.exports = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.send({errors});
    } else {
        next();
    }
}
