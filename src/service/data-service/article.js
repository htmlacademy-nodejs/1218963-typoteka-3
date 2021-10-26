'use strict';

const Aliase = require(`../models/aliase`);

class ArticleService {
  constructor(sequelize) {
    this._sequelize = sequelize;
    this._Article = sequelize.models.Article;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
    this._User = sequelize.models.User;
  }

  async create(articleData) {
    const article = await this._Article.create(articleData);
    await article.addCategories(articleData.categories);
    return article.get();
  }

  async drop(id) {
    const deletedRow = await this._Article.destroy({
      where: {id}
    });

    return !!deletedRow;
  }

  async findAll() {
    const include = [];
    include.push(Aliase.COMMENTS);
    const articles = await this._Article.findAll({include});

    return articles.map((item) => item.get());
  }

  async findOne(articleId) {
    return await this._Article.findByPk(articleId, {include: [Aliase.CATEGORIES]});
  }

  async update({id, article}) {
    const affectedRows = await this._Article.update(article, {
      where: {
        id,
        userId: article.userId
      }
    });

    const updatedArticle = await this._Article.findOne({
      where: {
        id,
        userId: article.userId
      }
    });

    await updatedArticle.setCategories(article.categories);

    return !!affectedRows;
  }
}

module.exports = ArticleService;
