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

module.exports = commentRouter;
