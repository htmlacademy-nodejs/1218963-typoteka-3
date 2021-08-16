'use strict';

const {
  MAX_ID_LENGTH
} = require(`../constants`);

const {
  nanoid
} = require(`nanoid`);

class CommentService {
  constructor(articles) {
    this._articles = articles;
  }
  create(articleId, comment) {
    const comments = this._articles.find((item) => item.id === articleId).comments;
    const newComment = Object
      .assign({
        id: nanoid(MAX_ID_LENGTH),
      }, comment);

    comments.push(newComment);
    return newComment;
  }

  drop(articleId, id) {
    const comments = this._articles.find((item) => item.id === articleId).comments;
    const comment = comments.filter((item) => item.id !== id);
    return comment;
  }

  findOne(articleId) {
    return this._articles.find((item) => item.id === articleId).comments;
  }

}

module.exports = CommentService;
