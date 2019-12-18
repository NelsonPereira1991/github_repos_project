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

const server = http.Server(app)

server.listen(config.port, config.host, function onStart(err) {
    err ? console.log(err) : console.info("Listening on port " + config.port);
});
