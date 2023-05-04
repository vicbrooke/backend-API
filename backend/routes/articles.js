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

articleRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newArticle = await Article.create(data);
    res.status(201).send(newArticle);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.delete("/:id", async (req, res, next) => {
  try {
    await Article.destroy({ where: { id: req.params.id } });
    res.status(202).send(`Article with id ${req.params.id} deleted`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.put("/:id", async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const articleToUpdate = await Article.findOne({ where: { id } });
    if (!articleToUpdate) {
      return res.status(404).send("Article not found");
    }
    await articleToUpdate.update(data);
    const updatedArticle = await Article.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(updatedArticle);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = articleRouter;
