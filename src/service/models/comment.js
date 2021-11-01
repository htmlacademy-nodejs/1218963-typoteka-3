"use strict";

const {DataTypes, Model} = require(`sequelize`);
const Aliase = require(`./aliase`);

class Comment extends Model {}

const define = (sequelize) => Comment.init({
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  sequelize,
  modelName: `Comment`,
  tableName: `comments`
});

const defineRelations = ({Article, User}) => {
  Comment.belongsTo(Article, {foreignKey: `article_id`});
  Comment.belongsTo(User, {as: Aliase.USERS, foreignKey: `user_id`});
};

module.exports = {define, defineRelations};
