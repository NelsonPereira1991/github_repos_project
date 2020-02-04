import GitResponse from "../../utils/GitResponse";
import {Response} from "express"
import {getRepositoriesByUsername} from "../services/repository";
export const getUserRepositories = async(req: any, res: Response, next: Function) => {
    try {
        const userGitUsername = req.params.username
        const page = parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 1
        const repositories = await getRepositoriesByUsername(userGitUsername, page)

        if(repositories.length > 0) {
            const nextLink = repositories.length > 0 && req.nextLinkBaseUrl ? `${req.nextLinkBaseUrl}?page=${page + 1}` : undefined
            const responseData = {
                repositories,
                nextLink,
                githubApiUser: process.env.GITHUB_USERNAME
            }
            return new GitResponse(res)
                .success(responseData, 'Repositories successfully retrieved deployed')
        } else {
            return new GitResponse(res)
                .noContent('No more repositories')
        }

    } catch (error) {
        next(error)
    }
}