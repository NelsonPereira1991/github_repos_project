class Response {
    constructor(res, statusCode, message, data = undefined) {
        this._res = res;
        this._statusCode = statusCode;
        this._message = message;
        this._data = data;
    }

    get res() {
        return this._res
    }

    get statusCode() {
        return this._statusCode
    }

    get message() {
        return this._message;
    }

    get data() {
        return this._data;
    }

    set res(res) {
        this._res = res;
    }

    set statusCode(statusCode) {
        this._statusCode = statusCode;
    }

    set message(message) {
        this._message = message;
    }

    set data(data) {
        this._data = data;
    }

    send() {
        return this._res.status(this._statusCode).send({
            status: this._statusCode,
            message: this._message,
            data:  this._data
        });
    }
}

module.exports = {
    createResponse : (res, statusCode, message, type, data) => {
        switch (type) {
            case "success":
                return new Response(res, statusCode, message, data);
            case "error":
                return new Response(res, statusCode, message);
            default:
                throw Error(`Invalid response type: ${type}`);
        }
    }
};