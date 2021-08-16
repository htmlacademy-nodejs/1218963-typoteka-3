'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  async findAll(searchText) {
    const articles = await this._articles.findAll({
      where: {
        title: searchText
      },
    });
    return articles.map((article) => article.get());
  }

}

module.exports = SearchService;
