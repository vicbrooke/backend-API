const { Article, Comment, User } = require("../db/models/");
const { Router } = require("express");

const articleRouter = Router();

// add article routes here

articleRouter.get("/", async (req, res, next) => {
  try {
    const articles = await Article.findAll();
    res.status(200).send({ articles });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.get("/:id", async (req, res, next) => {
  try {
    const article = await Article.findOne({
      where: { id: req.params.id },

      include: [Comment, User],
    });
    res.status(200).send({ article });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newArticle = await Article.create(data);
    res.status(201).send({ newArticle });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const articleToDelete = await Article.findOne({
      where: { id },
      include: User,
    });
    if (articleToDelete.user.username === req.oidc.user.username) {
      await Article.destroy({ where: { id } });
      res.status(202).send(`Article with id ${id} deleted`);
    } else {
      res.status(401).send("You do not have permission to delete this article");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

articleRouter.put("/:id", async (req, res, next) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const articleToUpdate = await Article.findOne({
      where: { id },
      include: User,
    });
    if (!articleToUpdate) {
      return res.status(404).send("Article not found");
    }
    if (articleToUpdate.user.username === req.oidc.user.username) {
      await articleToUpdate.update(data);
      const updatedArticle = await Article.findOne({
        where: { id: req.params.id },
      });
      res.status(200).send({ updatedArticle });
    } else {
      res.status(401).send("You do not have permission to update this article");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = articleRouter;
