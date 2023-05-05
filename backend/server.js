const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/users");
const articleRouter = require("./routes/articles");
const commentRouter = require("./routes/comments");
const { getApi } = require("./routes/getApi");
const { auth } = require("express-openid-connect");
const config = require("../authConfig");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  req.oidc.isAuthenticated()
    ? res.send(res.redirect("/api"))
    : res.send("Logged out");
});

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);
app.use("/api", getApi);

module.exports = app;
