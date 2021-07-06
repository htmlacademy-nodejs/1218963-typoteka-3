'use strict';

const {Router} = require(`express`);
const mainRoutes = new Router();

mainRoutes.get(`/`, (req, res) => res.send(`/`));
mainRoutes.get(`/register`, (req, res) => res.send(`/register`));
mainRoutes.get(`/login`, (req, res) => res.render(`/login`));
mainRoutes.get(`/search`, (req, res) => res.send(`/search`));
mainRoutes.get(`/categiries`, (req, res) => res.send(`/categiries`));

module.exports = mainRoutes;
