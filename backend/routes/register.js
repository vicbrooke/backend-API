const { Router } = require("express");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");

const registerRouter = Router();

registerRouter.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.create({ email, password });

    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    res.status(201).send({ user, token });
  } catch (error) {
    next(error);
  }
});

module.exports = registerRouter;
