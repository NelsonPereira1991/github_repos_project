module.exports = class Repository {
    constructor(name, owner_login, branches) {
        this._name = name;
        this._owner_login = owner_login;
        this._branches = branches;
    }

    get name() {
        return this._name;
    }

    get owner_login() {
        return this._owner_login;
    }

    get branches() {
        return this._branches;
    }

    set name(name) {
        this._name = name;
    }

    set owner_login(owner_login) {
        this._owner_login = owner_login;
    }

    set branches(branches) {
        this._branches = branches;
    }

    toJSON() {
        return {
            name: this._name,
            owner_login: this._owner_login,
            branches: this._branches
        };
    }
};