const { db } = require("./db");
const { Article, Comment, User } = require("./models");

const { articles, comments, users } = require("./seedData");

const seed = async () => {
  try {
    await db.sync({ force: true }); // recreate db
    const createdUsers = await User.bulkCreate(users);
    const createdArticles = await Article.bulkCreate(articles);
    const createdComments = await Comment.bulkCreate(comments);
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;
