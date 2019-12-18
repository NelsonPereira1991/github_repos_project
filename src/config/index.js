const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const hasEnv = dotenv.config();

if(!hasEnv) {
    throw new Error("Missing .env file");
}

module.exports = {
    host: process.env.HOST,
    port: parseInt(process.env.PORT, 10),
    api_prefix: "/api",
    external_apis: {
        github: {
            base_url: "https://api.github.com/",
            paths: {
                get_repositories: "users/:username/repos",
                get_repository_branches: "/repos/:username/:repositoryname/branches"
            },
            headers: {
                Accept: "application/vnd.github.v3+json"
            }
        }
    },

};