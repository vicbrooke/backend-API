const { Sequelize, db } = require("../db");

const Comment = db.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  body: Sequelize.STRING,
  votes: Sequelize.INTEGER,
  // author: Sequelize.STRING,
});

module.exports = { Comment };
