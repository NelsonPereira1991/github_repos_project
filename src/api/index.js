const repository = require("./routes/repository");
const express = require("express");
const router = express.Router;

module.exports = () => {
    const app = router();
    repository(app);
    return app;
}