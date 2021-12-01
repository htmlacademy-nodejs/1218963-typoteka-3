'use strict';

const sequelize = require(`../../service/lib/sequelize`);
const session = require(`express-session`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);
sequelize.sync({force: false});

const mySessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 180000,
  checkExpirationInterval: 60000
});

module.exports = {
  session,
  mySessionStore
};
