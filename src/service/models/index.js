/* eslint-disable camelcase */
"use strict";

const CommentModel = require(`./comment`);
const ArticleModel = require(`./article`);
const CategoryModel = require(`./category`);
const UserModel = require(`./user`);


const define = (sequelize) => {
  const Comment = CommentModel.define(sequelize);
  const Article = ArticleModel.define(sequelize);
  const Category = CategoryModel.define(sequelize);
  const User = UserModel.define(sequelize);

  [CategoryModel, CommentModel, ArticleModel, UserModel].forEach(
      (model) => model.defineRelations({Comment, Article, Category, User}));

  return {Category, Comment, Article, User};
};

module.exports = define;
