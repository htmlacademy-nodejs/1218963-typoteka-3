'use strict';

const {
  Router
} = require(`express`);

const route = new Router();

const {
  HttpCode
} = require(`../constants`);

module.exports = (app, commentService) => {

  app.use(`/comments`, route);

  route.get(`/`, (req, res) => {
    const comments = commentService.findAll();

    res.status(HttpCode.OK)
      .json(comments);
  });
};
