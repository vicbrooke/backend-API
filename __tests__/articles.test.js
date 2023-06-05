const request = require("supertest");
// express app
const app = require("../server");

// jest mocking of user
jest.mock("../middleware/oidcAuth");
jest.mock("../middleware/oidcRequiresAuth");

// db setup
const seed = require("../db/seedFn");
const { articles, comments, users } = require("../db/seedData");
const { Article } = require("../db/models");

describe("articles", () => {
  beforeAll(async () => {
    // rebuild db before the test suite runs
    await seed();
  });

  describe("GET /articles", () => {
    it("should return a list of articles", async () => {
      // make a request
      const response = await request(app).get("/articles");
      // assert a response code
      expect(response.status).toBe(200);
      // expect a response
      expect(response.body).toBeDefined();
      // toEqual checks deep equality in objects
      expect(response.body.articles[0]).toEqual(
        expect.objectContaining(articles[0])
      );
      expect(response.body.articles[1]).toEqual(
        expect.objectContaining(articles[1])
      );
      expect(response.body.articles[2]).toEqual(
        expect.objectContaining(articles[2])
      );
    });
  });

  describe("GET /articles/:id", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/articles/1");
    });
    it("should return a single article", async () => {
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.article).toEqual(
        expect.objectContaining(articles[0])
      );
    });
    it("should return the associated comment data", () => {
      expect(response.body.article.comments).toBeDefined();
      // mapping over the first two elements of the comments array and creating expect.objectContaining matchers for each comment object
      const expectedComments = comments
        .slice(0, 2)
        .map((comment) => expect.objectContaining(comment));
      // check if the response.body.article.comments array contains objects with properties matching the expected comments, while ignoring any additional properties
      expect(response.body.article.comments).toEqual(
        expect.arrayContaining(expectedComments)
      );
    });
    it("should return the user for each comment", () => {
      expect(response.body.article.comments[0].user).toBeDefined();
    });
    it("should return the associated user data", () => {
      expect(response.body.article.user).toBeDefined();
      expect(response.body.article.user).toEqual(
        expect.objectContaining(users[0])
      );
    });
  });

  describe("POST /articles", () => {
    const testArticleData = {
      title: "Test Articles",
      userId: 1,
      body: "This is a test article",
      votes: 0,
      userId: 1,
    };
    let response;
    beforeEach(async () => {
      response = await request(app).post("/articles").send(testArticleData);
    });
    it("should return the sent data", () => {
      expect(response.body.newArticle).toEqual(
        expect.objectContaining(testArticleData)
      );
    });
    it("returned article should match database entry", async () => {
      const articleInDb = await Article.findOne({
        where: { id: response.body.newArticle.id },
      });
      const { newArticle } = response.body;
      expect(articleInDb.id).toEqual(newArticle.id);
      expect(articleInDb.title).toEqual(newArticle.title);
      expect(articleInDb.author).toEqual(newArticle.author);
      expect(articleInDb.body).toEqual(newArticle.body);
      expect(articleInDb.votes).toEqual(newArticle.votes);
      expect(articleInDb.userId).toEqual(newArticle.userId);
    });
  });

  describe("DELETE /articles/:id", () => {
    describe("delete article with correct user id", () => {
      let response;
      beforeAll(async () => {
        response = await request(app).delete("/articles/1");
      });
      it("should delete the article matching the given id", async () => {
        expect(await Article.findOne({ where: { id: 1 } })).toBeNull();
      });
      it("should return confirmation message", () => {
        expect(response.text).toBe("Article with id 1 deleted");
      });
    });

    describe("delete article with incorrect user id", () => {
      let response;
      beforeAll(async () => {
        response = await request(app).delete("/articles/2");
      });
      it("should return no permission error message", () => {
        expect(response.text).toBe(
          "You do not have permission to delete this article"
        );
      });
    });
  });

  describe("PUT /articles/:id", () => {
    describe("update article with correct user id", () => {
      const testArticleData = {
        title: "Updated Test Article",
        body: "This is the updated test article",
      };
      let response;
      beforeAll(async () => {
        response = await request(app).put("/articles/4").send(testArticleData);
      });
      it("should update the article matching the given id", () => {
        const { updatedArticle } = response.body;
        expect(updatedArticle.id).toBe(4);
        expect(updatedArticle.title).toEqual(testArticleData.title);
        expect(updatedArticle.body).toEqual(testArticleData.body);
      });
      it("should return a 404 error message if the article does not exist", async () => {
        const response = await request(app)
          .put("/articles/99")
          .send(testArticleData);
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("Article not found");
      });
    });

    describe("update article with incorrect user id", () => {
      const testArticleData = {
        title: "Updated Test Article",
        body: "This is the updated test article",
      };
      let response;
      beforeAll(async () => {
        response = await request(app).put("/articles/2").send(testArticleData);
      });
      it("should return no permission error message", () => {
        expect(response.text).toBe(
          "You do not have permission to update this article"
        );
      });
    });
  });
});
