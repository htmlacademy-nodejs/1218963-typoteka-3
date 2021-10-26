'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../constants.js`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, async (req, res) => {
    const categories = await service.findAll();
    res.status(HttpCode.OK)
      .json(categories);
  });

  route.get(`/:categoryId`, async (req, res) => {
    const {categoryId} = req.params;

    const category = await service.findOne(categoryId);

    res.status(HttpCode.OK)
      .json({
        category
      });
  });
};
