const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const apiRouter = require("./api");

const app = express();

app.get('/status', (req, res) => {
    res.status(200).end();
});

app.use(cors());

app.use(bodyParser.json());

app.use(config.api_prefix, apiRouter());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const error = new Error("Not found");
    error.statusCode = 404;
    next(error);
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err);
    if(!err.statusCode || err.statusCode === 500) {
        err.statusCode = 500;
        err.message = "Oops, an unexpected error happened, don't worry we are looking into it"
    }
    return res.status(err.statusCode).send({
        status: err.statusCode,
        message: err.message
    });
});

const server = http.Server(app)

server.listen(config.port, config.host, function onStart(err) {
    err ? console.log(err) : console.info("Listening on port " + config.port);
});
