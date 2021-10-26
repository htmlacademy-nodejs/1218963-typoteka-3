/* eslint-disable camelcase */
"use strict";

const {DataTypes, Model} = require(`sequelize`);

class Article extends Model {

}

const define = (sequelize) => Article.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  announce: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  fulltext: {
    // eslint-disable-next-line new-cap
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  // eslint-disable-next-line new-cap
  picture: DataTypes.STRING(1000)
},
{
  createdAt: false,
  updatedAt: false,
  sequelize,
  modelName: `Article`,
  tableName: `articles`
});

module.exports = define;
