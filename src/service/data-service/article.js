'use strict';

const {
  MAX_ID_LENGTH
} = require(`../constants`);

const {
  nanoid
} = require(`nanoid`);


class ArticleService {
  constructor(items) {
    this._items = items;
  }

  create(article) {
    const newItem = Object
      .assign({
        id: nanoid(MAX_ID_LENGTH),
        comments: []
      }, article);

    this._items.push(newItem);
    return newItem;
  }

  drop(id) {
    const article = this._items.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._items = this._items.filter((item) => item.id !== id);
    return article;
  }

  findAll() {
    return this._items;
  }

  findOne(id) {
    return this._items.find((item) => item.id === id);
  }

  update(id, article) {
    const oldItem = this._items
      .find((item) => item.id === id);

    return Object.assign(oldItem, article);
  }

}

module.exports = ArticleService;
