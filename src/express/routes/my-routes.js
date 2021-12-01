'use strict';

const {
  Router
} = require(`express`);
const myRoutes = new Router();
const api = require(`../api`).getAPI();

const auth = require(`../middlewares/auth`);

myRoutes.get(`/`, auth, async (req, res) => {
  const {user} = req.session;

  const articles = await api.getArticles();
  res.render(`my`, {
    articles,
    user
  });
});

myRoutes.get(`/comments`, auth, async (req, res) => {
  const {user} = req.session;

  const comments = await api.getComments();
  res.render(`comments`, {comments, user});
});

module.exports = myRoutes;
