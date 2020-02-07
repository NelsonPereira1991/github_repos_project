import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import {errorHandler, notFoundHandler} from './src/application/middlewares/common';
const swaggerUi = require('swagger-ui-express')
import swaggerDocument from './openapi.json';
import config from './src/config'
import apiRouter from './src/application/routes'

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(config.api_prefix, apiRouter());

//serving the api docs page
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

const server = new http.Server(app)

server.listen(config.port, () => {
    console.info(`Listening on port ${config.port}`);
})

export default server; //exposing for testing