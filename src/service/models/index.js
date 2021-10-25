"use strict";

const {Model} = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const defineUser = require(`./user`);
const Aliase = require(`./aliase`);

class ArticleCategory extends Model {

}

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const User = defineUser(sequelize);

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `article_id`, onDelete: `cascade`});
  Comment.belongsTo(Article, {foreignKey: `article_id`});

  ArticleCategory.init({}, {sequelize});

  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES});
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES});
  // Category.hasMany(Article, {as: Aliase.ARTICLE_CATEGORIES, foreignKey: `category_id`});

  User.hasMany(Article, {as: Aliase.ARTICLES, foreignKey: `user_id`});
  Article.belongsTo(User, {as: Aliase.USERS, foreignKey: `user_id`});

  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `user_id`});
  Comment.belongsTo(User, {as: Aliase.USERS, foreignKey: `user_id`});
  Comment.belongsTo(Article, {as: Aliase.COMMENTS, foreignKey: `article_id`});

  return {Category, Comment, Article, ArticleCategory, User};
};

module.exports = define;
