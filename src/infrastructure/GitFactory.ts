import GitError from '../utils/GitError'
import GithubClient from './GithubClient'
import config from '../config'
import GitClientInterface from "./GitClientInterface";

export enum GIT_TYPES {
    GITHUB = 'GITHUB',
    BITBUCKET = 'BITBUCKET'
}


export const buildGitClient = (type: GIT_TYPES) : GitClientInterface => {
    switch(type) {
        case GIT_TYPES.GITHUB:
            return new GithubClient(config.external_apis.github.base_url, config.external_apis.github.user, config.external_apis.github.access_token, config.external_apis.github.headers)
        default:
            throw new GitError(400, 'Invalid Git type')
    }
}