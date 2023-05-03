const { Article } = require("./Article");
const { Comment } = require("./Comment");
const { User } = require("./User");
const { sequelize, Sequelize } = require("../db");

// add relationships between Models here
Article.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Article);

Comment.belongsTo(Article, { foreignKey: "articleId" });
Article.hasMany(Comment);

module.exports = {
  Article,
  Comment,
  User,
  sequelize,
  Sequelize,
};
