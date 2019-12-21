const repoService = require("../services/repository");
const responseFactory = require("../../utils/factories/response");

exports.getUserGithubRepositories = async (req, res, next) => {
    try {
        const username = req.params.username;
        const page = parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 1;
        let result = await repoService.getUserGithubRepositories(username, page, req.nextLinkBaseUrl);
        return responseFactory
            .createResponse(res, 200, "Repositories fetched successfully", "success", result)
            .send();
    } catch (error) {
        next(error);
    }
}