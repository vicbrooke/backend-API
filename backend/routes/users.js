const { User } = require("../db/models/");
const { Router } = require("express");

const userRouter = Router();

// add user routes in here

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = userRouter;
