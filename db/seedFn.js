const { db } = require("./db");
const { Article, Comment, User } = require("./models");

const seed = async () => {
  if (process.env.NODE_ENV === "test") {
    try {
      await db.sync({ force: true }); // recreate db
      const { articles, comments, users } = require("./seedData");

      await User.bulkCreate(users);
      await Article.bulkCreate(articles);
      await Comment.bulkCreate(comments);
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await db.sync({ force: true }); // recreate db

      const { users, articles, comments } = require("./mockData");
      await User.bulkCreate(users);
      await Article.bulkCreate(articles);
      await Comment.bulkCreate(comments);
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = seed;
