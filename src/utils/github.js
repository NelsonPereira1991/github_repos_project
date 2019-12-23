const axios = require("axios");
const Branch = require("../entities/branch");
const Repository = require("../entities/repository");

module.exports = class GithubUtil {
    constructor(config) {
        this._config = config;
    }

    get config() {
        return this._config;
    }

    set config(config) {
        this._config = config;
    }

    getUserRepos(username, page = 1) {
        const url = this._config.base_url + `users/${username}/repos`;
        let requestConfig = {
            headers: this._config.headers,
            params: {
                per_page: this._config.repositories_per_page,
                page,
                type: 'owner'
            }
        };
        return axios.get(url, requestConfig).then(response => {
            return this.parseResponse(response, "User");
        }).catch(error => {
            return this.parseResponse(error, "User");
        })
    }

    getUserRepoBranches(username, repositoryName) {
        const url = this._config.base_url + `repos/${username}/${repositoryName}/branches`;
        let requestConfig = {
            headers: this._config.headers,
            params: {
                per_page: this._config.branches_per_repository
            }
        };
        return axios.get(url, requestConfig).then(response => {
            return this.parseResponse(response, "Repository");
        }).catch(error => {
            return this.parseResponse(error, "Repository");
        })
    }

    parseResponse(githubResponse, resourceType) {
        let error;
        if(githubResponse.status === 200){
            return githubResponse;
        }
        switch (githubResponse.response.status) {
            case 404:
                error = new Error(`Could not find ${resourceType}`);
                error.statusCode = 404;
                throw error;
            case 401:
                error = new Error(`Bad credentials, please make sure you have a valid github username and access token`);
                error.statusCode = 401;
                throw error;
            case 403:
                const tryAgainAtTimestamp = parseInt(githubResponse.response.headers['x-ratelimit-reset'], 10);
                const tryAgainText = tryAgainAtTimestamp ? `at ${new Date(tryAgainAtTimestamp * 1000)}` : "later";
                const errorMessage = `Api rate limited exceeded, please try again ${tryAgainText}`;
                error = new Error(errorMessage);
                error.statusCode = 403;
                throw error;
            default:
                error = new Error("Invalid response from github");
                error.statusCode = 500;
                throw error;
        }
    }

    async parseBranches(username, repositoryName) {
        let branchesResponse = await this.getUserRepoBranches(username, repositoryName);
        return branchesResponse.data.map( (branchData) => {
            return new Branch(branchData.name, branchData.commit.sha).toJSON();
        });
    }

    async parseRepositories(username, repositoriesResponse) {
        //Yeah I don't really like to do this, I looked in the github api and it does not seem to exist a way to get non-fork user repos
        //documentation link https://developer.github.com/v3/repos/#list-user-repositories
        //tried with type as 'owner' and it still returns forked repos, default for type is 'owner' anyway
        const nonForkRepos = repositoriesResponse.data.filter(repoData => repoData.fork === false);
        const promises = nonForkRepos.map(async (repoData) => {
            return new Repository(repoData.name, repoData.owner.login, await this.parseBranches(username, repoData.name)).toJSON();
        });

        return Promise.all(promises);
    }
};