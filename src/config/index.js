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
            repositories_per_page: 1000,
            branches_per_repository: 1000,
            base_url: "https://api.github.com/",
            paths: {
                get_repositories: "users/:username/repos",
                get_repository_branches: "/repos/:username/:repositoryname/branches"
            },
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization:`Basic ${new Buffer.from(process.env.GITHUB_USERNAME+':'+process.env.GITHUB_USER_ACCESS_TOKEN).toString("base64")}`
            }
        }
    }
};