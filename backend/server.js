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
const { auth, requiresAuth } = require("express-openid-connect");
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
    ? res.redirect("/api")
    : res.send(
        "<h2>You do not have access to this API.</h2><h3>Please login or register</h3>"
      );
});

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/users", requiresAuth(), userRouter);
app.use("/articles", requiresAuth(), articleRouter);
app.use("/comments", requiresAuth(), commentRouter);
app.use("/api", requiresAuth(), getApi);

module.exports = app;
