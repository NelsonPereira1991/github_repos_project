const githubLib = require("../libs/github");


async function buildBranches(username, repoName) {
    let branchesResponse = await githubLib.getReposBranches(username, repoName);
    const promises = branchesResponse.data.map(async (branchData) => {
        return {
            name: branchData.name,
            last_commit_sha: branchData.commit.sha
        }
    });
    return Promise.all(promises);
}

async function buildRepoData(username, repoResponse) {
    const nonForkRepos = repoResponse.data.filter(repoData => repoData.fork === false);
    //const nonForkRepos = repoResponse.data.filter(repoData => true === true);
    const promises = nonForkRepos.map(async (repoData) => {
        return {
            name: repoData.name,
            owner_login: repoData.owner.login,
            branches: await buildBranches(username, repoData.name)
        };
    });

    return Promise.all(promises);
}

exports.getUserGithubRepositories = async (username) => {
    const userReposResponse = await githubLib.getUserRepos(username);
    const reposResult = await buildRepoData(username, userReposResponse);
    return {
        repositories: reposResult
    }
}