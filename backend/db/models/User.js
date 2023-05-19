const { Sequelize, db } = require("../db");
// const bcrypt = require("bcrypt"); - no longer require bcrypt

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: Sequelize.STRING,
  name: Sequelize.STRING,
  // password: Sequelize.STRING, - no need to store passwords as using Auth0
  email: Sequelize.STRING,
  avatar_URL: Sequelize.STRING,
});

// no longer storing passwords so don't need to hash them
// before a user is created, hash the password
// User.beforeCreate(async (user) => {
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   user.password = hashedPassword;
// });

module.exports = { User };
