const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi');
const config = require("./config");
const apiRouter = require("./api");
const middlewares = require("./api/middlewares");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(config.api_prefix, apiRouter());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(middlewares.notFoundHandler);

// error handler
app.use(middlewares.errorHandler);

const server = http.Server(app);
server.listen(config.port, config.host, function onStart(err) {
    err ? console.log(err) : console.info(`Listening on port ${config.port}`);
});

module.exports = server; // for testing
