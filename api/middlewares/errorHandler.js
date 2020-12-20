module.exports = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    const statusCode = error.status || 500;
    const response = {
        code: statusCode,
    };

    if (error.message) {
        response.message = error.message;
    }

    if (error.details) {
        response.details = {};

        Object.keys(error.details).forEach((field) => {
            response.details[field] = error.details[field];
        });
    }

    return res.status(statusCode).send(response);
};
