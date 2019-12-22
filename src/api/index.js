const repositoryRoutes = require("./routes/repository");
const express = require("express");
const router = express.Router;

module.exports = () => {
    const apiRouter = router();
    repositoryRoutes(apiRouter);
    return apiRouter;
}