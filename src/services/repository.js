const githubLib = require("../libs/github");
const config = require("../config");


async function buildBranches(username, repoName) {
    let branchesResponse = await githubLib.getReposBranches(username, repoName);
    const promises = branchesResponse.data.map(async (branchData) => {
        return {
            name: branchData.name,
            last_commit_sha: branchData.commit.sha
        };
    });
    return Promise.all(promises);
}

async function buildRepoData(username, repoResponse) {
    const nonForkRepos = repoResponse.data.filter(repoData => repoData.fork === false);
    const promises = nonForkRepos.map(async (repoData) => {
        return {
            name: repoData.name,
            owner_login: repoData.owner.login,
            branches: await buildBranches(username, repoData.name)
        };
    });

    return Promise.all(promises);
}

exports.getUserGithubRepositories = async (username, page = 1, callingUrl) => {
    const userReposResponse = await githubLib.getUserRepos(username, page);
    const reposResult = await buildRepoData(username, userReposResponse);
    return {
        repositories: reposResult,
        nextLink: reposResult.length === config.external_apis.github.repositories_per_page ? `${callingUrl}?page=${page+1}`: undefined
    };
}