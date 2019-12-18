//import { Router, Request, Response } from 'express';
//import middlewares from '../middlewares';
const express = require("express");
const router = express.Router;
const route = router();
const githubLib = require("../../libs/github");

module.exports = (app) => {
    app.use('/repos', route);

    route.get('/:username', (req, res) => {
        //return res.json({ user: req.currentUser }).status(200);
        const username = req.params.username;
        return githubLib.getUserRepos(username).then(response => {
            /*
            {
                repos: [
                    {
                        repository_name: repository_name,
                        owner_login: owner_login,
                        branches: [
                            {
                                name: name,
                                last_commit_sha: last_commit_sha
                            }
                        ]
                    }
                ]
            }
             */
            return res.json({ data: response.data }).status(200);
        }).catch(error => {
            return res.json({ error: error }).status(400);
        })
    });
};