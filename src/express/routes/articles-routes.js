'use strict';

const {Router} = require(`express`);
const articlesRoutes = new Router();
const api = require(`../api`).getAPI();

articlesRoutes.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));
articlesRoutes.get(`/add`, (req, res) => res.render(`new-post`));

articlesRoutes.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);
  res.render(`edit-post`, {article});
});

articlesRoutes.get(`/:id`, (req, res) => res.render(`post`));

module.exports = articlesRoutes;

