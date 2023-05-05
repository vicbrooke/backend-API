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
const { User } = require("./db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).send("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET);
    res.status(202).send({ user, token });
  } catch (err) {
    next(err);
  }
});

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  req.oidc.isAuthenticated()
    ? res.send(res.redirect("/api"))
    : res.send("Logged out");
});

app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);
app.use("/api", getApi);

module.exports = app;
