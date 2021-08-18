'use strict';

const {
  Router
} = require(`express`);

const route = new Router();

const {
  HttpCode
} = require(`../constants`);

const commentValidator = require(`../middlewares/comment-validator`);
const articleExist = require(`../middlewares/article-exists`);

module.exports = (app, articleService, commentService) => {

  app.use(`/articles`, route);

  route.get(`/:articleId/comments`, [articleExist(articleService)], (req, res) => {
    const {
      articleId
    } = req.params;

    const comments = commentService.findOne(articleId);

    res.status(HttpCode.OK)
      .json(comments);

  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articleService)], (req, res) => {
    const {
      articleId,
      commentId
    } = req.params;
    const deleted = commentService.drop(articleId, commentId);

    if (!deleted) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deleted);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {
      articleId
    } = req.params;

    const comment = commentService.create(articleId, req.body);

    if (!comment) {
      return res.status(HttpCode.BAD_REQUEST)
        .send(`Not created`);
    }

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};
