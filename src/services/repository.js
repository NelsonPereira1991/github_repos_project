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
    /*
    const promises = repoResponse.data.map(async (repoData) => {
        //repoData.fork === false
        if(repoData.fork === false) {
            return {
                repository_name: repoData.name,
                owner_login: repoData.owner.login,
                branches: await buildBranches(username, repoData.name)
            }
        }
    })
    */
    /*
    const promises = repoResponse.data.reduce(async (accumulator, repoData) => {
        if(repoData.fork === false) {
            accumulator.push({
                repository_name: repoData.name,
                owner_login: repoData.owner.login,
                branches: await buildBranches(username, repoData.name)
            });
        }
    }, []);
    */

    const nonForkRepos = repoResponse.data.filter(repoData => repoData.fork === false);
    //const nonForkRepos = repoResponse.data.filter(repoData => true === true);
    const promises = nonForkRepos.map(async (repoData) => {
        return {
            repository_name: repoData.name,
            owner_login: repoData.owner.login,
            branches: await buildBranches(username, repoData.name)
        };
    });

    return Promise.all(promises);
}

exports.getUserGithubRepositories = async (username) => {
    /*
        {
            repos: [
                {
                    repository_name: repository_name,
                    owner_login: owner_login,
                    branches: [
                        {
                            name: name,
                            last_commit_sha: last_commit_sha
                        }
                    ]
                }
            ]
        }
         */
    /*
    return githubLib.getUserRepos(username).then(response => {
        //return res.json({ data: response.data }).status(200);
    }).catch(error => {
        return res.json({ error: error }).status(400);
    })
    */
    const userReposResponse = await githubLib.getUserRepos(username);
    const repoResult = await buildRepoData(username, userReposResponse);
    return {
        repos: repoResult
    }
}