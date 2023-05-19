const { Sequelize, db } = require("../db");

const Article = db.define("article", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING,
  // author: Sequelize.STRING,
  body: Sequelize.STRING,
  votes: Sequelize.INTEGER,
});

module.exports = { Article };
