const request = require("supertest");
// express app
const app = require("../server");

// jest mocking of user
jest.mock("../middleware/oidcAuth");
jest.mock("../middleware/oidcRequiresAuth");

// db setup
const seed = require("../db/seedFn");
const { comments } = require("../db/seedData");
const { Comment } = require("../db/models");

describe("comments", () => {
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
      expect(response.body.comments[0]).toEqual(
        expect.objectContaining(comments[0])
      );
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
    beforeAll(async () => {
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

  describe("DELETE /comments/:id", () => {
    let response;
    beforeAll(async () => {
      response = await request(app).delete("/comments/1");
    });
    it("should delete the comment matching the given id", async () => {
      expect(await Comment.findOne({ where: { id: 1 } })).toBeNull();
    });
    it("should return confirmation message", () => {
      expect(response.text).toBe("Comment with id 1 deleted");
    });
  });

  describe("PUT /comments/:id", () => {
    const testCommentData = {
      body: "This is the updated test comment",
    };
    let response;
    beforeAll(async () => {
      response = await request(app).put("/comments/2").send(testCommentData);
    });
    it("should update the Comment matching the given id", () => {
      expect(response.body.id).toBe(2);
      expect(response.body.body).toEqual(testCommentData.body);
    });
    it("should return a 404 error message if the comment does not exist", async () => {
      const response = await request(app)
        .put("/comments/99")
        .send(testCommentData);
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe("Comment not found");
    });
  });
});
