import {GIT_TYPES, buildGitClient} from '../../infrastructure/GitFactory'
import Repository from "../../domain/Repository";

export const getRepositoriesByUsername = async (gitUsername: string, page: number = 1) : Promise<Repository[]> => {
    const gitClient = buildGitClient(GIT_TYPES.GITHUB)
    return await gitClient.getUserRepositories(gitUsername, page)
}