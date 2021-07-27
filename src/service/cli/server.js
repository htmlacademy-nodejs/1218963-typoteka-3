'use strict';

const fs = require(`fs`).promises;

const {
  FILENAME
} = require(`../constants`);

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

    const app = express();
    app.use(express.json());

    app.get(`/posts`, async (req, res) => {
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (err) {
        res.json([]);
      }
    });
    app.listen(port);

    app.use((req, res) => res
      .status(HttpCode.NOT_FOUND)
      .send(`Not found`));
  }
};
