module.exports = class Branch {
    constructor(branchName, lastCommitSha) {
        this._name = branchName;
        this._last_commit_sha = lastCommitSha
    }

    get name() {
        return this._name;
    }

    get last_commit_sha() {
        return this._last_commit_sha;
    }

    set name(name) {
        this._name = name;
    }

    set last_commit_sha(last_commit_sha) {
        this._last_commit_sha = last_commit_sha;
    }

    toJSON() {
        return {
            name: this._name,
            last_commit_sha: this._last_commit_sha
        };
    }
};