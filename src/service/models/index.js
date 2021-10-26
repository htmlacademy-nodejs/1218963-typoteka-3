/* eslint-disable camelcase */
"use strict";

const {DataTypes, Model} = require(`sequelize`);
const defineCategory = require(`./category`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const Aliase = require(`./aliase`);

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);

  class ArticleCategory extends Model {

  }

  ArticleCategory.init({
    article_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Article,
        key: `id`
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: `id`
      }
    },
  }, {
    CategoryId: `category_id`,
    created_at: false,
    updatedAt: false,
    sequelize
  });

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `article_id`, onDelete: `cascade`});
  Comment.belongsTo(Article, {foreignKey: `article_id`});

  Article.belongsToMany(Category, {through: `article_categories`, as: Aliase.CATEGORIES, foreignKey: `article_id`});
  Category.belongsToMany(Article, {through: `article_categories`, as: Aliase.ARTICLES, foreignKey: `category_id`});

  return {Category, Comment, Article};
};

module.exports = define;
