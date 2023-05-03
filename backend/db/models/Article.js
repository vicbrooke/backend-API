const { Sequelize, sequelize } = require("../db");

const Article = sequelize.define("article", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  body: Sequelize.STRING,
  votes: Sequelize.INTEGER,
});

module.exports = { Article };
