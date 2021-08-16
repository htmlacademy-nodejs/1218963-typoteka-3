'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../constants`);

const articleValidator = require(`../middlewares/article-validator`);
// const articleExist = require(`../middlewares/article-exists`);
// const routeParamsValidator = require(`../middlewares/route-params-validator`);

const route = new Router();


module.exports = (app, articleService, commentService) => {

  app.use(`/articles`, route);

  route.get(`/`, async (req, res) => {
    const articles = await articleService.findAll();
    res.status(HttpCode.OK)
      .json(articles);
  });


  route.get(`/:articleId`, (req, res) => {
    const {
      articleId
    } = req.params;
    const offer = articleService.findOne(articleId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK)
      .json(offer);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const offer = articleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(offer);
  });

  route.put(`/:articleId`, [articleValidator], async (req, res) => {
    const {
      articleId
    } = req.params;

    const updated = await articleService.update(articleId, req.body);

    if (!updated) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }
    return res.status(HttpCode.OK)
      .send(`Updated`);
  });

  route.delete(`/:articleId`, async (req, res) => {
    const {
      articleId
    } = req.params;
    const article = await articleService.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  });

  route.get(`/:articleId/comments`, async (req, res) => {
    const {
      articleId
    } = req.params;

    const comments = await commentService.findOne(articleId);

    res.status(HttpCode.OK)
      .json(comments);

  });

  route.delete(`/:articleId/comments/:commentId`, async (req, res) => {
    const {articleId, commentId} = req.params;
    const deleted = await commentService.drop(articleId, commentId);

    if (!deleted) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deleted);
  });

  route.post(`/:articleId/comments`, async (req, res) => {
    const {articleId} = req.params;

    const comment = await commentService.create(articleId, req.body);

    return res.status(HttpCode.CREATED)
      .json(comment);
  });
};
