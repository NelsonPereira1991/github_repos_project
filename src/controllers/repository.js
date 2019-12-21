const repoService = require("../services/repository")

exports.getUserGithubRepositories = async (req, res, next) => {
    try {
        const username = req.params.username;
        const page = parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 1;
        let result = await repoService.getUserGithubRepositories(username, page, req.nextLinkBaseUrl);
        return res.json(result).status(200);
    } catch (error) {
        next(error);
    }
}