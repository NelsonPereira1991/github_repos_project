const GithubLib = require("../libs/github");
const config = require("../../config");

exports.createGitLib = (type) => {
    switch (type) {
        case "github":
            return new GithubLib(config.external_apis.github);
        default:
            throw Error(`Invalid git type: ${type}`);
    }
};