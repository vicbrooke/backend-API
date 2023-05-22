// loads and configures the dotenv package to read and load environment variables from the .env file.
require("dotenv").config(".env");

const express = require("express");
const app = express();
const cors = require("cors");

// logging middleware for Express. It logs information about incoming requests to the console.
const morgan = require("morgan");

const {
  articleRouter,
  commentRouter,
  getApi,
  // loginRouter,
  // registerRouter,
  userRouter,
} = require("./routes/index");

// provides authentication functionality using OpenID Connect
// const { auth, requiresAuth } = require("express-openid-connect"); - moved into middleware files

// const config = require("../authConfig"); - moved into middleware file
const oidcAuth = require("./middleware/oidcAuth");
const oidcRequiresAuth = require("./middleware/oidcRequiresAuth");
const { checkRegisteredUser } = require("./middleware/checkRegisteredUser");

// middleware
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// configures Morgan to log HTTP requests in the "dev" format, which includes the request method, URL, response status, and response time.
app.use(morgan("dev"));

// adds the built-in Express middleware for parsing JSON bodies of incoming requests.
app.use(express.json());

// adds the built-in Express middleware for parsing URL-encoded bodies of incoming requests. The extended option allows for parsing complex objects.
app.use(express.urlencoded({ extended: true }));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(oidcAuth, checkRegisteredUser);

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  req.oidc.isAuthenticated()
    ? res.redirect("/api")
    : res.send(
        "<h2>You do not have access to this API.</h2><h3>Please <a href='http://localhost:4000/login'>login</a>"
      );
});

// app.use("/login", loginRouter);
// app.use("/register", registerRouter);
app.use("/users", oidcRequiresAuth, userRouter);
app.use("/articles", oidcRequiresAuth, articleRouter);
app.use("/comments", oidcRequiresAuth, commentRouter);
app.use("/api", oidcRequiresAuth, getApi);

module.exports = app;
