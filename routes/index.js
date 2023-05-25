const articleRouter = require("./articles");
const commentRouter = require("./comments");
const { getApi } = require("./getApi");
const userRouter = require("./users");

module.exports = {
  articleRouter,
  commentRouter,
  getApi,
  userRouter,
};
