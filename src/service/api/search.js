'use strict';

const {
  Router
} = require(`express`);
const {
  HttpCode
} = require(`../constants`);

const route = new Router();

module.exports = (app, searchService) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const query = req.query;

    if (Object.keys(query).length === 0) {
      res.status(HttpCode.BAD_REQUEST)
      .send(`Bad Request`);
    }

    const searchResults = searchService.findAll(query);

    if (searchResults.includes(undefined)) {
      res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    res.status(HttpCode.OK)
      .json(searchResults);
  });
};
