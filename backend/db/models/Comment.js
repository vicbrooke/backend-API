const { Sequelize, sequelize } = require("../db");

const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  body: Sequelize.STRING,
  votes: Sequelize.INTEGER,
  author: Sequelize.STRING,
});

module.exports = { Comment };
