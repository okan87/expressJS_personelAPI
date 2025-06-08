"use strict";
module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        error: true,
        message: err.message,
        cause: err.cause || undefined,
        sent: req.body,
    });
};