const { db } = require("./db");
const { Article, Comment, User } = require("./models");
const bcrypt = require("bcrypt");

const { articles, comments, users } = require("./seedData");

const seed = async () => {
  try {
    await db.sync({ force: true }); // recreate db
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        const hash = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hash,
        };
      })
    );
    const createdUsers = await User.bulkCreate(usersWithHashedPasswords);
    const createdArticles = await Article.bulkCreate(articles);
    const createdComments = await Comment.bulkCreate(comments);
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;
