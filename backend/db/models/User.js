const { Sequelize, db } = require("../db");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: Sequelize.STRING,
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  avatar_URL: Sequelize.STRING,
});

module.exports = { User };
