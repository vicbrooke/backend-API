const { Comment, Article, User } = require("../db/models");
const { Router } = require("express");

const commentRouter = Router();

// add comment routes here

commentRouter.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).send({ comments });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentRouter.get("/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: { id: req.params.id },
      include: [Article, User],
    });
    res.status(200).send({ comment });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newComment = await Comment.create(data);
    res.status(200).send({ newComment });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const commentToDelete = await Comment.findOne({
      where: { id },
      include: User,
    });
    if (commentToDelete.user.username === req.oidc.user.username) {
      await Comment.destroy({ where: { id } });
      res.status(202).send(`Comment with id ${id} deleted`);
    } else {
      res.status(401).send("You do not have permission to delete this comment");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentRouter.put("/:id", async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const commentToUpdate = await Comment.findOne({
      where: { id },
      include: User,
    });
    if (!commentToUpdate) {
      return res.status(404).send("Comment not found");
    }
    if (commentToUpdate.user.username === req.oidc.user.username) {
      await commentToUpdate.update(data);
      const updatedComment = await Comment.findOne({
        where: { id },
      });
      res.status(200).send({ updatedComment });
    } else {
      res.status(401).send("You do not have permission to update this comment");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = commentRouter;
