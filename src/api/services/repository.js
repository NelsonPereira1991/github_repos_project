const gitFactory = require("../../utils/factories/git");

exports.getUserRepositories = async (username, page = 1, callingUrl) => {
    //TODO if we implemented other repo types,e.g bitbucket
    //we would need to create another util file
    //but the code here would not need to be changed, other then receive the gitType in the request
    const gitType = "github";
    const gitUtil = gitFactory.createGitUtil(gitType);
    const userReposResponse = await gitUtil.getUserRepos(username, page);
    const repositories = await gitUtil.parseRepositories(username, userReposResponse);
    return {
        repositories,
        nextLink: repositories.length > 0 && callingUrl ? `${callingUrl}?page=${page+1}`: undefined
    };
}