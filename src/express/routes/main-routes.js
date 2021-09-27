'use strict';

const {
  Router
} = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();

mainRoutes.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`main`, {articles});
});

mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));

mainRoutes.get(`/search`, async (req, res) => {
  try {
    const {query} = req.query;
    const results = await api.search(query);

    res.render(`search-2`, {
      results
    });
  } catch (error) {
    res.render(`search-1`, {
      results: []
    });
  }
});

mainRoutes.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRoutes;
