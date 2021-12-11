/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
'use strict';

const Aliase = require(`../models/aliase`);

class CategoryService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Category = sequelize.models.Category;
    // this._ArticleCategory = sequelize.models.ArticleCategory;
  }

  async findAll() {
    return this._Category.findAll();
  }
  async findOne(categoryId) {
    return this._Category.findByPk(categoryId);
  }
  async findPage(categoryId) {
    const include = [
      Aliase.CATEGORIES
    ];

    const articles = await this._Article.findAll({
      include
    });

    const articlesByCategory = [];

    articles.map((article) => {
      article.categories.map((category) => {
        if (category.id == categoryId) {
          articlesByCategory.push(article);
        }
      });
    });

    return articlesByCategory;
  }
}

module.exports = CategoryService;
