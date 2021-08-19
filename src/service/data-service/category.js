'use strict';

class CategoryService {
  constructor(items) {
    this._items = items;
  }

  findAll() {
    const categories = this._items.reduce((acc, item) => {
      item.category.forEach((category) => acc.add(category));
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
