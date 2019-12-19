const express = require("express");
const router = express.Router;
const route = router();
const repoService = require("../../services/repository")

module.exports = (app) => {
    app.use('/repos', route);

    route.get('/:username', async (req, res) => {
        const username = req.params.username;
        const page = parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 1;
        const callingUrl = `${req.headers.host}${req.baseUrl}/${username}`;
        let result = await repoService.getUserGithubRepositories(username, page, callingUrl);
        return res.json(result).status(200);
    });
};