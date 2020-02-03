import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import {errorHandler, notFoundHandler} from './src/application/middlewares/common';
//import swaggerUi from 'swagger-ui-express'
//const swaggerDocument = require('./openapi');
import config from './src/config'
//const apiRouter = require("./api");
import apiRouter from './src/application/routes'

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(config.api_prefix, apiRouter());

//serving the api docs page
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

//const server = http.Server(app);
const server = new http.Server(app)
//const host = config.host || 'localhost'
/*
server.listen(config.port, 'localhost', function onStart(err: Error) {
    err ? console.log(err) : console.info(`Listening on port ${config.port}`);
});
*/

//server.listen(config.port, config.host, () => {
//or only listen for port
server.listen(config.port, '0.0.0.0', () => {
    console.info(`Listening on port ${config.port}`);
})

export default server; //exposing for testing