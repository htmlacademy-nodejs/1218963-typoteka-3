/* eslint-disable camelcase */
"use strict";

const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const defineUser = require(`./user`);
const Aliase = require(`./aliase`);

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const User = defineUser(sequelize);


  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `article_id`, onDelete: `cascade`});
  Comment.belongsTo(Article, {foreignKey: `article_id`});

  Article.belongsToMany(Category, {through: Aliase.ARTICLE_CATEGORIES, as: Aliase.CATEGORIES, foreignKey: `article_id`});
  Category.belongsToMany(Article, {through: Aliase.ARTICLE_CATEGORIES, as: Aliase.ARTICLES, foreignKey: `category_id`});

  User.hasMany(Article, {as: Aliase.ARTICLES, foreignKey: `user_id`});
  Article.belongsTo(User, {as: Aliase.USERS, foreignKey: `user_id`});

  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `user_id`});
  Comment.belongsTo(User, {as: Aliase.USERS, foreignKey: `user_id`});

  return {Category, Comment, Article};
};

module.exports = define;
