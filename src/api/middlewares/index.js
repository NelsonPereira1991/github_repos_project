exports.checkHeader = (req, res, next) => {
    if(req.headers.accept && req.headers.accept === "application/json") {
        next();
    } else {
        return res.status(406).send({
            status: 406,
            message: "Invalid value for 'accept' header, cannot produce a response matching the list of acceptable values"
        });
    }
};

exports.notFoundHandler = (req, res, next) => {
    const error = new Error("Not found");
    error.statusCode = 404;
    next(error);
};

exports.buildNextLinkBaseUrl = (req, res, next) => {
    const username = req.params.username;
    req.nextLinkBaseUrl = `${req.headers.host}${req.baseUrl}/${username}`;
    next();
};

exports.errorHandler = (err, req, res, next) => {
    console.error(err);
    if(!err.statusCode || err.statusCode === 500) {
        err.statusCode = 500;
        err.message = "Oops, an unexpected error happened, don't worry we are looking into it"
    }
    return res.status(err.statusCode).send({
        status: err.statusCode,
        message: err.message
    });
}