export default class GitError {
    private readonly _statusCode: number
    private readonly _message: string

    constructor(statusCode: number, message: string) {
        this._statusCode = statusCode
        this._message = message
    }

    get statusCode() {
        return this._statusCode
    }

    get message() {
        return this._message
    }
}