'use strict';
const chalk = require(`chalk`);

const fs = require(`fs`).promises;

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
  FILE_NAME,
  ExitCode
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
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.success);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.error);

    }
  }
};
