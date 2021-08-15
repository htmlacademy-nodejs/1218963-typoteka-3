'use strict';

const API_PREFIX = `/api`;

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {

  name: `--server`,
  run() {
    const express = require(`express`);
    const port = 3000;
    const routes = require(`../api`);

    const app = express();
    app.use(express.json());

    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`));
    app.use(API_PREFIX, routes);
    app.listen(port);
  }
};
