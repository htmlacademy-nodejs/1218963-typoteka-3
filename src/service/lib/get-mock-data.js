'use strict';

const fs = require(`fs`).promises;
const FILENAME = `mocks.json`;
let data = null;
const {getLogger} = require(`../lib/logger`);
const logger = getLogger({name: `api`});

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    logger.error(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports.getMockData = getMockData;
