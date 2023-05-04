const { Comment, Article } = require("../db/models");
const { Router } = require("express");

const commentRouter = Router();

// add comment routes here

commentRouter.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).send(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newComment = await Comment.create(data);
    res.status(200).send(newComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

commentRouter.delete("/:id", async (req, res, next) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } });
    res.status(202).send(`Comment with id ${req.params.id} deleted`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = commentRouter;
