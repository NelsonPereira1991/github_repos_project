import dotenv from "dotenv"

process.env.NODE_ENV = process.env.NODE_ENV || "development"

const hasEnv = dotenv.config();

/*
if(hasEnv.error) {
    throw new Error("Missing .env file, look for .env.template file to create the required .env file");
}
*/

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || ''
const GITHUB_USER_ACCESS_TOKEN = process.env.GITHUB_USER_ACCESS_TOKEN || ''
const TOKEN = Buffer.from(GITHUB_USERNAME + ':' + GITHUB_USER_ACCESS_TOKEN).toString('base64')

export default Object.freeze(
    {
        host: process.env.HOST || 'localhost',
        port: parseInt(process.env.PORT || "3000", 10),
        api_prefix: "/api",
        external_apis: {
            github: {
                user: GITHUB_USERNAME,
                access_token: GITHUB_USER_ACCESS_TOKEN,
                repositories_per_page: 1000,
                branches_per_repository: 1000,
                base_url: "https://api.github.com/",
                headers: {
                    Accept: "application/vnd.github.v3+json",
                    Authorization:`Basic ${TOKEN}`
                }
            }
        }
    }
);