/* eslint-disable camelcase */
'use strict';

const {
  Router
} = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();
const OFFERS_PER_PAGE = 8;
const auth = require(`../middlewares/auth`);

const upload = require(`../middlewares/upload`);
const {
  prepareErrors
} = require(`../../utils`);

mainRoutes.get(`/`, async (req, res) => {
  const {
    user
  } = req.session;
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
    totalPages,
    user
  });
});

mainRoutes.get(`/login`, (req, res) => {
  const {user} = req.session;

  res.render(`login`, {user});
});

mainRoutes.post(`/login`, async (req, res) => {
  const {
    body
  } = req;
  const email = body.email;
  const password = body.password;
  try {
    const user = await api.auth(email, password);
    req.session.user = user;
    req.session.save(() => {
      res.redirect(`/`);
    });
  } catch (errors) {
    const validationMessages = prepareErrors(errors);
    res.render(`login`, {
      validationMessages
    });
  }
});

mainRoutes.get(`/register`, (req, res) => {
  const {user} = req.session;

  res.render(`sign-up`, {user});
});

mainRoutes.get(`/search`, async (req, res) => {
  const {user} = req.session;

  try {
    const {
      query
    } = req.query;
    const results = await api.search(query);

    res.render(`search`, {
      results,
      user
    });
  } catch (error) {
    res.render(`search-empty`, {
      results: []
    });
  }
});

mainRoutes.get(`/categories`, auth, (req, res) => {
  const {user} = req.session;

  res.render(`all-categories`, {user});
});

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
    password: body.password
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

mainRoutes.get(`/logout`, (req, res) => {
  delete req.session.user;
  res.redirect(`/`);
});

module.exports = mainRoutes;
