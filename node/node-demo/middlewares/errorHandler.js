exports.logErrors = function (err, req, res, next) {
    console.error('log middlewares', err.stack)
    next(err)
}

exports.clientErrorHandler = function (err, req, res, next) {
    if (req.xhr) {
        if (err.status === 404) {
            res.status(404).send({ error: 'API IS Not Found!' })
        } else {
            res.status(500).send({ error: 'Something failed!' })
        }
    } else {
        next(err)
    }
}
exports.errorHandler = function (err, req, res, next) {
    let status = 500;
    let template = 'error';
    if (err.status === 404) {
        status = 404;
        template = '404';
    }
    res.status(status);
    res.render(template, { error: err });
}