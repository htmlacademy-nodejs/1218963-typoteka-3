"use strict";

const {
  DataTypes,
  Model
} = require(`sequelize`);
const Aliase = require(`./aliase`);

class Category extends Model {}

const define = (sequelize) => Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  sequelize,
  modelName: `Category`,
  tableName: `categories`
});

const defineRelations = ({Article}) => {
  Category.belongsToMany(Article, {through: Aliase.ARTICLE_CATEGORIES, as: Aliase.ARTICLES, foreignKey: `category_id`});
};

module.exports = {define, defineRelations};
