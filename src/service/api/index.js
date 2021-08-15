'use strict';

const {
  Router
} = require(`express`);
const category = require(`../api/category.js`);
// const offer = require(`../api/articles`);
// const search = require(`../api/search`);

const {
  CategoryService
  //   SearchService,
  //   OfferService,
  //   CommentService,
  //   UserService
} = require(`../data-service`);

const {
  getMockData
} = require(`../lib/get-mock-data.js`);

// const sequelize = require(`../lib/sequelize`);
// const defineModels = require(`../models`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  category(app, new CategoryService(mockData));
  //   search(app, new SearchService(sequelize));
  //   offer(app, new OfferService(sequelize), new CommentService(sequelize));
  //   user(app, new UserService(sequelize));
})();

module.exports = app;
