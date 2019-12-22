const express = require("express");
const router = express.Router;
const repositoryRouter = router();
const middlewares = require("../middlewares");
const repoController = require("../controllers/repository");
const resourcePrefix = "/repos";

module.exports = (apiRouter) => {
    apiRouter.use(resourcePrefix, repositoryRouter);
    repositoryRouter.get("/:username", middlewares.checkHeader, middlewares.buildNextLinkBaseUrl, repoController.getUserRepositories);
};