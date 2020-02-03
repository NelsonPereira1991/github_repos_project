import {Response} from 'express'

export default class GitResponse {
    private _res: Response
    private _statusCode: number
    private _message: string
    private _data: any

    constructor(response: Response) {
        this._res = response
        this._statusCode = 200
        this._message = 'success'
        this._data = null
    }

    private withStatusCode(statusCode: number) {
        this._statusCode = statusCode
        return this
    }

    private withMessage(message: string) {
        this._message = message
        return this
    }

    private withData(data: any) {
        this._data = data
        return this
    }

    private send() {
        return this._res.status(this._statusCode).send({
            status: this._statusCode,
            message: this._message,
            data: this._data
        });
    }

    public invalidAcceptHeader() {
        const statusCode = 406;
        const message = "Invalid value for 'accept' header, cannot produce a response matching the list of acceptable values";
        new GitResponse(this._res)
            .withStatusCode(statusCode)
            .withMessage(message)
            .withData(undefined)
            .send()
    }

    public success(data: any, message: string = 'Operation executed successfully') {
        const statusCode = 200;
        new GitResponse(this._res)
            .withStatusCode(statusCode)
            .withMessage(message)
            .withData(data)
            .send()
    }

    public internalServerError(message: string = 'internal server error') {
        const statusCode = 500;
        new GitResponse(this._res)
            .withStatusCode(statusCode)
            .withMessage(message)
            .withData(undefined)
            .send()
    }

    public genericError(statusCode: number, message: string) {
        new GitResponse(this._res)
            .withStatusCode(statusCode)
            .withMessage(message)
            .withData(undefined)
            .send()
    }

    public noContent(message: string = 'No content') {
        const statusCode = 204;
        new GitResponse(this._res)
            .withStatusCode(statusCode)
            .withMessage(message)
            .send()
    }
}