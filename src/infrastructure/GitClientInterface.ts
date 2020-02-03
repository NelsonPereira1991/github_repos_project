import Repository from "../domain/Repository";
import Branch from "../domain/Branch";

export default interface GitClientInterface {
    readonly _baseUrl: string,
    readonly _gitUser: string,
    readonly _gitUserToken: string,
    readonly _requestHeaders: object
    getUserRepositories(username: string, page: number) : Promise<Repository[]>
    getRepositoryBranches(username: string, repository: string) : Promise<Branch[]>
}