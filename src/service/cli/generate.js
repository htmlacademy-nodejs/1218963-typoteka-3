'use strict';

const fs = require(`fs`);

const {
  getRandomInt,
  shuffle,
} = require(`../utils`);

const {
  CATEGORIES,
  SENTENCES,
  TITLES,
  SumRestrict,
  DEFAULT_COUNT,
  FILE_NAME
} = require(`../constants`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: new Date(getRandomInt(SumRestrict.MIN, SumRestrict.MAX)).toLocaleDateString(`en-US`),
    announce: shuffle(SENTENCES).slice(1, 5).join(` `),
    fullText: shuffle(SENTENCES).slice(1, 5).join(` `),
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        process.exit(1);
      }
      process.exit(0);
    });
  }
};
