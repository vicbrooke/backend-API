const { db } = require("./db");
const { Article, Comment, User } = require("./models");

const { articles, comments, users } = require("./seedData");

const seed = async () => {
  try {
    await db.sync({ force: true }); // recreate db

    // no longer storing passwords in database so don't need this code

    // const usersWithHashedPasswords = await Promise.all(
    //   users.map(async (user) => {
    //     const hash = await bcrypt.hash(user.password, 10);
    //     return {
    //       ...user,
    //       password: hash,
    //     };
    //   })
    // );

    await User.bulkCreate(users);
    await Article.bulkCreate(articles);
    await Comment.bulkCreate(comments);
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;
