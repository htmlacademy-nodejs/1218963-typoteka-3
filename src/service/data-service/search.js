'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(searchText) {
    let result = [];
    // if (!searchText) {
    //   result = ``;
    // }
    result.push(this._articles.find((item) => item.title.includes(searchText.title)));
    return result;
  }

}

module.exports = SearchService;
