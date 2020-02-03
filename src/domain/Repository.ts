import Branch from "./Branch";

export default class Repository {
    private readonly _name : string
    private readonly _ownerLogin : string
    private readonly _branches : Branch[]

    constructor(name: string, ownerLogin: string, branches : Branch[]) {
        this._name = name
        this._ownerLogin = ownerLogin
        this._branches = branches
    }

    toJSON(){
        return {
            name: this._name,
            owner_login: this._ownerLogin,
            branches: this._branches
        }
    }
}