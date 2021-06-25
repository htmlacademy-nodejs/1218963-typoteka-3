'use strict';

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  success: 0,
  error: 1
};

const SumRestrict = {
  MIN: 1618066947,
  MAX: 1623337347,
};

module.exports = {
  DEFAULT_COUNT,
  DEFAULT_COMMAND,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  SumRestrict,
  USER_ARGV_INDEX,
  ExitCode
};
