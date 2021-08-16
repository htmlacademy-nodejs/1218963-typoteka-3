'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../constants`);

const articleValidator = require(`../middlewares/article-validator`);
const route = new Router();


module.exports = (app, articleService) => {

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
};
