export default class Branch {
    private readonly _name : string
    private readonly _lastCommitSha : string

    constructor(name: string, lastCommitSha: string) {
        this._name = name
        this._lastCommitSha = lastCommitSha
    }

    toJSON() {
        return {
            name: this._name,
            last_commit_sha: this._lastCommitSha
        }
    }
}