const articleRouter = require("./articles");
const commentRouter = require("./comments");
const { getApi } = require("./getApi");
const loginRouter = require("./login");
const registerRouter = require("./register");
const userRouter = require("./users");

module.exports = {
  articleRouter,
  commentRouter,
  getApi,
  loginRouter,
  registerRouter,
  userRouter,
};
