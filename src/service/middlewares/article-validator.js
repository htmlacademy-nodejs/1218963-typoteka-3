'use strict';
const {
  HttpCode
} = require(`../constants`);

const articleKeys = [`category`, `title`, `announce`, `fullText`, `createdDate`, `comments`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = articleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
