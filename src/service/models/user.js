"use strict";

const {DataTypes, Model} = require(`sequelize`);
const Aliase = require(`./aliase`);

class User extends Model {}

const define = (sequelize) => User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`
});

const defineRelations = ({Comment, Article}) => {
  User.hasMany(Article, {as: Aliase.ARTICLES, foreignKey: `user_id`});
  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `user_id`});
};

module.exports = {define, defineRelations};
