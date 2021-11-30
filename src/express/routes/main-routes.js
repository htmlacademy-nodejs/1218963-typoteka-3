/* eslint-disable camelcase */
'use strict';

const {
  Router
} = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();
const OFFERS_PER_PAGE = 8;

const upload = require(`../middlewares/upload`);
const {
  prepareErrors
} = require(`../../utils`);

mainRoutes.get(`/`, async (req, res) => {
  let {
    page = 1
  } = req.query;
  page = +page;

  const limit = OFFERS_PER_PAGE;

  const offset = (page - 1) * OFFERS_PER_PAGE;
  const {
    count,
    articles
  } = await api.getArticles(limit, offset);

  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);

  res.render(`main`, {
    articles,
    page,
    totalPages
  });
});

mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));

mainRoutes.get(`/search`, async (req, res) => {
  try {
    const {
      query
    } = req.query;
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

mainRoutes.post(`/register`, upload.single(`upload`), async (req, res) => {
  const {
    body,
    file
  } = req;
  const userData = {
    avatar: file ? file.filename : ``,
    first_name: body.name,
    last_name: body.surname,
    email: body.email,
    password_hash: body.password
  };
  try {
    await api.createUser(userData);
    res.redirect(`/login`);
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    res.render(`sign-up`, {
      validationMessages,
      firstName: body.name || ``,
      lastName: body.surname || ``,
      email: body.email || ``,
      password: body.password || ``
    });
  }
});

module.exports = mainRoutes;
