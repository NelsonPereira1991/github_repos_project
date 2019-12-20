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
    console.error(JSON.stringify(err));
    //TODO NELSON handle errors here, if 500 do not send the err.message, else send the message
    return res.status(err.statusCode || 500).send({
        status: err.statusCode || 500,
        message: err.message
    });
});

const server = http.Server(app)

server.listen(config.port, config.host, function onStart(err) {
    err ? console.log(err) : console.info("Listening on port " + config.port);
});
