'use strict';

class CommentService {
  constructor(articles) {
    this.articles = articles;
    this._comment = articles.comment;
  }
  create(articles, comment) {
    return this._comment.create({
      articles,
      ...comment
    });
  }

  async drop(id) {
    const deletedRows = await this._comment.destroy({
      where: {
        id
      }
    });

    return !!deletedRows;
  }

  findAll(id) {
    return this._comment.findAll({
      where: {
        id
      },
      raw: true
    });
  }

}

module.exports = CommentService;
