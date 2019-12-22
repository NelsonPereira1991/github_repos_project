const express = require("express");
const router = express.Router;
const route = router();
const middlewares = require("../middlewares");
const repoController = require("../controllers/repository");

module.exports = (apiRouter) => {
    apiRouter.use('/repos', route);
    route.get('/:username', middlewares.checkHeader, middlewares.buildNextLinkBaseUrl, repoController.getUserRepositories);
};