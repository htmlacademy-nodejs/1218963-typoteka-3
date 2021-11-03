'use strict';

const {
  Router
} = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();
const OFFERS_PER_PAGE = 8;

mainRoutes.get(`/`, async (req, res) => {
  let {page = 1} = req.query;
  page = +page;

  const limit = OFFERS_PER_PAGE;

  const offset = (page - 1) * OFFERS_PER_PAGE;
  const {count, articles} = await api.getArticles(limit, offset);

  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);

  res.render(`main`, {articles, page, totalPages});
});

mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));

mainRoutes.get(`/search`, async (req, res) => {
  try {
    const {query} = req.query;
    const results = await api.search(query);

    res.render(`search`, {
      results
    });
  } catch (error) {
    res.render(`search-empty`, {
      results: []
    });
  }
});

mainRoutes.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRoutes;
