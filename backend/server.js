const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/users");
const articleRouter = require("./routes/articles");
const commentRouter = require("./routes/comments");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);

module.exports = app;
