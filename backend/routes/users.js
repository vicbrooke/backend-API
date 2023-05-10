const { User } = require("../db/models/");
const { Router } = require("express");

const userRouter = Router();

// add user routes in here

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).send({ users });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = await User.create(data);
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(202).send(`User with id ${req.params.id} deleted`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.put("/:id", async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const userToUpdate = await User.findOne({ where: { id } });
    if (!userToUpdate) {
      return res.status(404).send("User not found");
    }
    await userToUpdate.update(data);
    const updatedUser = await User.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = userRouter;
