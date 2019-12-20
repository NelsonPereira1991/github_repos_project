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

exports.buildNextLinkBaseUrl = (req, res, next) => {
    const username = req.params.username;
    req.nextLinkBaseUrl = `${req.headers.host}${req.baseUrl}/${username}`;
    next();
};