const axios = require("axios");
const config = require("../config");

const axiosConfig = {
    headers: config.external_apis.github.headers,
};

exports.getUserRepos = async (username, page = 1) => {
    const url = config.external_apis.github.base_url + `users/${username}/repos`;
    let requestConfig = {
        ...axiosConfig,
        params: {
            per_page: config.external_apis.github.repositories_per_page,
            page
        }
    };
    return axios.get(url, requestConfig).then(response => {
        return response;
    }).catch(error => {
        return error;
    })
};

exports.getReposBranches = async (username, repoName) => {
    const url = config.external_apis.github.base_url + `repos/${username}/${repoName}/branches`;
    let requestConfig = {
        ...axiosConfig,
        params: {
            per_page: config.external_apis.github.branches_per_repository,
        }
    };
    return axios.get(url, requestConfig).then(response => {
        return response;
    }).catch(error => {
        return error;
    })
}