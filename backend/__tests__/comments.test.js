const request = require("supertest");
// express app
const app = require("../server");

// db setup
const seed = require("../db/seedFn");
const { comments } = require("../db/seedData");
const { Comment } = require("../db/models");

describe("users", () => {
  beforeAll(async () => {
    // rebuild db before the test suite runs
    await seed();
  });

  describe("GET /comments", () => {
    it("should return a list of comments", async () => {
      // make a request
      const response = await request(app).get("/comments");
      // assert a response code
      expect(response.status).toBe(200);
      // expect a response
      expect(response.body).toBeDefined();
      // toEqual checks deep equality in objects
      expect(response.body[0]).toEqual(expect.objectContaining(comments[0]));
    });
  });

  describe("POST /comments", () => {
    const testCommentData = {
      body: "This is a test comment",
      votes: 0,
      author: "Joe Bloggs",
      articleId: 1,
    };
    let response;
    beforeEach(async () => {
      response = await request(app).post("/comments").send(testCommentData);
    });
    it("should return the sent data", () => {
      expect(response.body).toEqual(expect.objectContaining(testCommentData));
    });
    it("returned comment should match database entry", async () => {
      const commentInDb = await Comment.findOne({
        where: { id: response.body.id },
      });
      expect(commentInDb.id).toEqual(response.body.id);
    });
  });
});
