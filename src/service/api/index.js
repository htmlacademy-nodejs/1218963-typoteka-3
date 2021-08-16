'use strict';

const {
  Router
} = require(`express`);
const category = require(`../api/category.js`);
const article = require(`../api/article.js`);

const {
  CategoryService,
  ArticleService
} = require(`../data-service`);

const {
  getMockData
} = require(`../lib/get-mock-data.js`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  category(app, new CategoryService(mockData));
  article(app, new ArticleService(mockData));
})();

module.exports = app;
