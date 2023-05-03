const { Article } = require("../db/models/");
const { Router } = require("express");

const articleRouter = Router();

// add article routes here

articleRouter.get("/", async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    res.status(200).send(articles);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = articleRouter;
