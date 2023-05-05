const { Router } = require("express");
const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
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

module.exports = loginRouter;
