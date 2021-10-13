'use strict';
const {
  HttpCode
} = require(`../constants`);

// const articleKeys = [`category`, `title`, `announce`, `fullText`, `createdDate`, `comments`];
const articleKeys = [`title`];

module.exports = (req, res, next) => {
  const newItem = req.body;
  const keys = Object.keys(newItem);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
