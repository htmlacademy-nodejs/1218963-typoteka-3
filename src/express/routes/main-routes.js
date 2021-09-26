'use strict';

const {
  Router
} = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();


mainRoutes.get(`/`, (req, res) => {
  const articles = api.getArticles();
  res.render(`main`, {articles});
});

mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/search`, (req, res) => res.render(`search-1`));
// mainRoutes.get(`/categories`, (req, res) => res.render(`all-categories`));

mainRoutes.get(`/categories`, async (req, res) => {
  const categories = await api.getCategories();
  res.render(`all-categories`, {
    categories
  });
});

module.exports = mainRoutes;
