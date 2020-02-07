# github_repos_project

## An api to get a user's non-fork public repositories

### Steps to run locally:
- Clone the repository with `git clone https://github.com/NelsonPereira1991/github_repos_project.git`
- cd into src folder
- create a `.env` file based on the schema from the `.env.template` file (don't forget to add your github username and access token to it)
- install dependencies with `npm install`
- run tests with `npm test`
- start api with `npm start`
- api runs by default on port 3000 but you can change it in the .env file
- to see the documentation do a GET request to the endpoint `http://localhost:3000/api-docs`