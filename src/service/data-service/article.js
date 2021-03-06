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
    return article.get();
  }

  async drop(id) {
    const deletedRow = await this._Article.destroy({
      where: {id}
    });

    return !!deletedRow;
  }

  async findAll() {
    const include = [
      Aliase.CATEGORIES, {
        model: this._User,
        as: Aliase.USERS,
        attributes: {
          exclude: [`passwordHash`]
        }
      },
      Aliase.COMMENTS];
    const articles = await this._Article.findAll({include});

    return articles.map((item) => item.get());
  }

  async findOne(articleId) {
    const include = [];
    include.push(Aliase.CATEGORIES, Aliase.COMMENTS);
    return await this._Article.findByPk(articleId, {include});
  }

  async findPage(limit, offset) {
    const {count, rows} = await this._Article.findAndCountAll({limit, offset});
    return {count, articles: rows};
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
