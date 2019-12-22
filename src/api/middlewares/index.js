const responseFactory = require("../../utils/factories/response");

exports.checkHeader = (req, res, next) => {
    if(req.headers.accept && req.headers.accept === "application/json") {
        next();
    } else {
        let statusCode = 406;
        let errorMessage = "Invalid value for 'accept' header, cannot produce a response matching the list of acceptable values";
        return responseFactory
            .createResponse(res, statusCode, errorMessage,"error")
            .send();
    }
};

exports.notFoundHandler = (req, res, next) => {
    const error = new Error("The page you are looking for does not exist :(");
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
    return responseFactory
        .createResponse(res, err.statusCode, err.message, "error")
        .send();
}