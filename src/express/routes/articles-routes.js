'use strict';

const {Router} = require(`express`);
const articlesRoutes = new Router();

articlesRoutes.get(`/category/:id`, (req, res) => res.render(`/articles/category/:id`));
articlesRoutes.get(`/add`, (req, res) => res.render(`/articles/add`));
articlesRoutes.get(`/edit/:id`, (req, res) => res.render(`/articles/edit/:id`));
articlesRoutes.get(`/:id`, (req, res) => res.render(`/articles/:id`));

module.exports = articlesRoutes;

