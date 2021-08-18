'use strict';

const {
  Router
} = require(`express`);
const category = require(`../api/category.js`);
const article = require(`../api/article.js`);
const search = require(`../api/search.js`);
const comment = require(`../api/comment.js`);

const {
  CategoryService,
  ArticleService,
  SearchService,
  CommentService,
} = require(`../data-service`);

const {
  getMockData
} = require(`../lib/get-mock-data.js`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  category(app, new CategoryService(mockData));
  article(app, new ArticleService(mockData));
  comment(app, new ArticleService(mockData), new CommentService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
