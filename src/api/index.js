const repository = require("./routes/repository");
const express = require("express");
const router = express.Router;

module.exports = () => {
    const apiRouter = router();
    repository(apiRouter);
    return apiRouter;
}