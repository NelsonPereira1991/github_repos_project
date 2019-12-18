//import { Router, Request, Response } from 'express';
//import middlewares from '../middlewares';
const express = require("express");
const router = express.Router;

const route = router();

module.exports = (app) => {
    app.use('/repos', route);

    route.get('/:username', (req, res) => {
        //return res.json({ user: req.currentUser }).status(200);
        return res.json({ user: "true" }).status(200);
    });
};