//import { Router, Request, Response } from 'express';
//import middlewares from '../middlewares';
const express = require("express");
const router = express.Router;
const route = router();
const repoService = require("../../services/repository")

module.exports = (app) => {
    app.use('/repos', route);

    route.get('/:username', async (req, res) => {
        //return res.json({ user: req.currentUser }).status(200);
        const username = req.params.username;
        let result = await repoService.getUserGithubRepositories(username);
        return res.json({ userData: result }).status(200);
    });
};