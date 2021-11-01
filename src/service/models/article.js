/* eslint-disable new-cap */
/* eslint-disable camelcase */
"use strict";

const {DataTypes, Model} = require(`sequelize`);
const Aliase = require(`./aliase`);

class Article extends Model {}

const define = (sequelize) => Article.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  announce: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  fulltext: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  picture: DataTypes.STRING(1000)
},
{
  createdAt: false,
  updatedAt: false,
  sequelize,
  modelName: `Article`,
  tableName: `articles`
});

const defineRelations = ({Comment, Category, User}) => {
  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `article_id`, onDelete: `cascade`});
  Article.belongsToMany(Category, {through: Aliase.ARTICLE_CATEGORIES, as: Aliase.CATEGORIES, foreignKey: `article_id`});
  Article.belongsTo(User, {as: Aliase.USERS, foreignKey: `user_id`});
};

module.exports = {define, defineRelations};
