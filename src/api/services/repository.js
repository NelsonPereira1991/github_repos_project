const config = require("../../config/index");
const gitFactory = require("../../utils/factories/git");

exports.getUserRepositories = async (username, page = 1, callingUrl) => {
    const gitType = "github";
    const gitLib = gitFactory.createGitLib(gitType);
    const userReposResponse = await gitLib.getUserRepos(username, page);
    const repositories = await gitLib.buildRepositories(username, userReposResponse);
    return {
        repositories,
        nextLink: repositories.length > 0 && callingUrl ? `${callingUrl}?page=${page+1}`: undefined
    };
}