const { User, Article, Comment } = require("../db/models/");
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

userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [Article, Comment],
    });
    if (user.username === req.oidc.user.username) {
      res.status(200).send({ user });
    } else {
      res.status(401).send("You do not have permission to view this user");
    }
  } catch (error) {}
});

userRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newUser = await User.create(data);
    res.status(200).send({ newUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToDelete = await User.findOne({ where: { id } });
    if (userToDelete.username === req.oidc.user.username) {
      await User.destroy({ where: { id } });
      res.status(202).send(`User with id ${id} deleted`);
    } else {
      res.status(401).send("You do not have permission to delete this user");
    }
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
    if (userToUpdate.username === req.oidc.user.username) {
      await userToUpdate.update(data);
      const updatedUser = await User.findOne({
        where: { id: req.params.id },
      });
      res.status(200).send({ updatedUser });
    } else {
      res.status(401).send("You do not have permission to update this user");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = userRouter;
