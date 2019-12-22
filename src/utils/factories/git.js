const GithubUtil = require("../github");
const config = require("../../config");

module.exports = {
    createGitUtil : (type) => {
        switch (type) {
            case "github":
                return new GithubUtil(config.external_apis.github);
            default:
                throw Error(`Invalid git type: ${type}`);
        }
    }
};