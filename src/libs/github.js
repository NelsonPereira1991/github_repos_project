const axios = require("axios");
const config = require("../config");

const axiosConfig = {
    headers: config.external_apis.github.headers
};

exports.getUserRepos = async (username) => {
    //const url = config.external_apis.github.base_url + config.external_apis.github.paths.get_repositories
    const url = config.external_apis.github.base_url + `users/${username}/repos`;
    //TODO NELSON add githubv3 header
    return axios.get(url, axiosConfig).then(response => {
        return response;
    }).catch(error => {
        return error;
    })
};

exports.getReposBranches = async (username, repoName) => {
    const url = config.external_apis.github.base_url + `repos/${username}/${repoName}/branches`;
    //TODO NELSON add githubv3 header
    return axios.get(url, axiosConfig).then(response => {
        return response;
    }).catch(error => {
        return error;
    })
}