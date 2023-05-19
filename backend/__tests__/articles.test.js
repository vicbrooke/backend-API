const request = require("supertest");
// express app
const app = require("../server");

// jest mocking of user
jest.mock("../middleware/oidcAuth");
jest.mock("../middleware/oidcRequiresAuth");

// db setup
const seed = require("../db/seedFn");
const { articles } = require("../db/seedData");
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

  describe("POST /articles", () => {
    const testArticleData = {
      title: "Test Articles",
      author: "Joe Bloggs",
      body: "This is a test article",
      votes: 0,
      userId: 1,
    };
    let response;
    beforeEach(async () => {
      response = await request(app).post("/articles").send(testArticleData);
    });
    it("should return the sent data", () => {
      expect(response.body).toEqual(expect.objectContaining(testArticleData));
    });
    it("returned article should match database entry", async () => {
      const articleInDb = await Article.findOne({
        where: { id: response.body.id },
      });
      expect(articleInDb.id).toEqual(response.body.id);
      expect(articleInDb.title).toEqual(response.body.title);
      expect(articleInDb.author).toEqual(response.body.author);
      expect(articleInDb.body).toEqual(response.body.body);
      expect(articleInDb.votes).toEqual(response.body.votes);
      expect(articleInDb.userId).toEqual(response.body.userId);
    });
  });

  describe("DELETE /articles/:id", () => {
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

  describe("PUT /articles/:id", () => {
    const testArticleData = {
      title: "Updated Test Article",
      body: "This is the updated test article",
    };
    let response;
    beforeAll(async () => {
      response = await request(app).put("/articles/2").send(testArticleData);
    });
    it("should update the article matching the given id", () => {
      expect(response.body.id).toBe(2);
      expect(response.body.title).toEqual(testArticleData.title);
      expect(response.body.body).toEqual(testArticleData.body);
    });
    it("should return a 404 error message if the article does not exist", async () => {
      const response = await request(app)
        .put("/articles/99")
        .send(testArticleData);
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe("Article not found");
    });
  });
});
