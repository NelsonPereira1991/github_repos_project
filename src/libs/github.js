const axios = require("axios");
const config = require("../config");

const axiosConfig = {
    headers: config.external_apis.github.headers,
};

function parseResponse(githubResponse, resourceType) {
    let error;
    if(githubResponse.status === 200){
        return githubResponse;
    }
    //TODO NELSON add the case when number of github api calls are exceeded
    switch (githubResponse.response.status) {
        case 404:
            error = new Error(`Could not find ${resourceType}`);
            error.statusCode = 404;
            throw error;
        case 401:
            error = new Error(`Bad credentials, please make sure you have a valid github username and access token`);
            error.statusCode = 401;
            throw error;
        case 200:
            break;
        default:
            error = new Error("Invalid response from github");
            error.statusCode = 500;
            throw error;
    }
}

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
        return parseResponse(response, "User");
    }).catch(error => {
        return parseResponse(error, "User");
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
        return parseResponse(response, "Repository");
    }).catch(error => {
        return parseResponse(error, "Repository");
    })
}