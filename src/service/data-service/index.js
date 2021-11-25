'use strict';

const CategoryService = require(`../data-service/category.js`);
const ArticleService = require(`../data-service/article.js`);
const SearchService = require(`../data-service/search.js`);
const CommentService = require(`../data-service/comment.js`);
const UserService = require(`../data-service/user.js`);

module.exports = {
  CategoryService,
  ArticleService,
  SearchService,
  CommentService,
  UserService
};
