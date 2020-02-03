import axios from "axios"
import GitClientInterface from "./GitClientInterface";
import Repository from "../domain/Repository";
import Branch from "../domain/Branch";
import GitError from "../utils/GitError";


const enum FETCHING_TYPES {
    USER_REPOSITORIES = 'User',
    REPOSITORY_BRANCHES = 'Repository'
}

export default class GithubClient implements GitClientInterface {
    readonly _baseUrl: string;
    readonly _gitUser: string;
    readonly _gitUserToken: string;
    readonly _requestHeaders: Object;

    constructor(baseUrl: string, gitUser: string, gitUserToken: string, requestHeaders: object){
        this._baseUrl = baseUrl
        this._gitUser = gitUser
        this._gitUserToken = gitUserToken
        this._requestHeaders = requestHeaders
    }

    async getUserRepositories(username: string, page: number): Promise<Repository[]> {
        const url = this._baseUrl + `users/${username}/repos`;
        let requestConfig = {
            headers: this._requestHeaders,
            params: {
                per_page: 1000,
                page,
                type: 'owner'
            }
        };
        try {
            const response = await axios.get(url, requestConfig)
            return await this.parseRepositoriesResponse(response);
        } catch (error) {
            throw this.parseErrorResponse(error, FETCHING_TYPES.USER_REPOSITORIES)
        }
    }

    async getRepositoryBranches (username: string, repositoryName: string): Promise<Branch[]> {
        const url = this._baseUrl + `repos/${username}/${repositoryName}/branches`;
        let requestConfig = {
            headers: this._requestHeaders,
            params: {
                per_page: 1000
            }
        };

        try  {
            const response = await axios.get(url, requestConfig)
            return await this.parseBranchesResponse(response)
        } catch (error) {
            throw this.parseErrorResponse(error, FETCHING_TYPES.REPOSITORY_BRANCHES)
        }
    }

    parseErrorResponse(githubResponse : any, fetchType : FETCHING_TYPES): any {
        let error;
        switch (githubResponse.response.status) {
            case 404:
                error = new GitError(404, `Could not find ${fetchType}`)
                throw error
            case 401:
                error = new GitError(401, `Bad credentials, please make sure you have a valid github username and access token`);
                throw error;
            case 403:
                const tryAgainAtTimestamp = parseInt(githubResponse.response.headers['x-ratelimit-reset'], 10);
                const tryAgainText = tryAgainAtTimestamp ? `at ${new Date(tryAgainAtTimestamp * 1000)}` : "later";
                const errorMessage = `Api rate limited exceeded, please try again ${tryAgainText}`;
                error = new GitError(403, errorMessage);
                throw error;
            default:
                console.error(githubResponse);
                error = new GitError(500, "Invalid response from github");
                throw error;
        }
    }

    parseRepositoriesResponse = async (gitHubResponse : any) : Promise<Repository[]> => {
        if(gitHubResponse.status === 200){
            return await this.buildRepositories(gitHubResponse)
        } else {
            return this.parseErrorResponse(gitHubResponse, FETCHING_TYPES.USER_REPOSITORIES)
        }
    }

    parseBranchesResponse = async (gitHubResponse : any) : Promise<Branch[]> => {
        if(gitHubResponse.status === 200){
            return await this.buildBranches(gitHubResponse)
        } else {
            return this.parseErrorResponse(gitHubResponse, FETCHING_TYPES.REPOSITORY_BRANCHES)
        }
    }

    buildRepositories(repositoriesResponse: any) : Promise<Repository[]> {
        //Yeah I don't really like to do this, I looked in the github api and it does not seem to exist a way to get non-fork user repos
        //documentation link https://developer.github.com/v3/repos/#list-user-repositories
        //tried with type as 'owner' and it still returns forked repos, default for type is 'owner' anyway
        const nonForkRepos = repositoriesResponse.data.filter((repoData:any) => repoData.fork === false);
        const promises = nonForkRepos.map(async (repoData: any) => {
            return new Repository(repoData.name, repoData.owner.login, await this.getRepositoryBranches(repoData.owner.login, repoData.name)).toJSON();
        });

        return Promise.all(promises);
    }

    buildBranches(branchesResponse: any) : Promise<Branch[]> {
        return branchesResponse.data.map( (branchData :any) => {
            return new Branch(branchData.name, branchData.commit.sha).toJSON();
        });
    }

}