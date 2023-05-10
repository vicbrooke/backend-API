require("dotenv").config(".env");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const {
  articleRouter,
  commentRouter,
  getApi,
  loginRouter,
  registerRouter,
  userRouter,
} = require("./routes/index");
const { auth } = require("express-openid-connect");
const config = require("../authConfig");

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
