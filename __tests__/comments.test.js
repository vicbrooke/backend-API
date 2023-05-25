const request = require("supertest");
// express app
const app = require("../server");

// jest mocking of user
jest.mock("../middleware/oidcAuth");
jest.mock("../middleware/oidcRequiresAuth");

// db setup
const seed = require("../db/seedFn");
const { comments, articles, users } = require("../db/seedData");
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

  describe("GET /comments/:id", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/comments/1");
    });
    it("should return a single comment", async () => {
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.comment).toEqual(
        expect.objectContaining(comments[0])
      );
    });
    it("should return the associated article data", () => {
      expect(response.body.comment.article).toBeDefined();
      expect(response.body.comment.article).toEqual(
        expect.objectContaining(articles[0])
      );
    });
    it("should return the associated user data", () => {
      expect(response.body.comment.user).toBeDefined();
      expect(response.body.comment.user).toEqual(
        expect.objectContaining(users[1])
      );
    });
  });

  describe("POST /comments", () => {
    const testCommentData = {
      body: "This is a test comment",
      votes: 0,
      userId: 1,
      articleId: 1,
    };
    let response;
    beforeAll(async () => {
      response = await request(app).post("/comments").send(testCommentData);
    });
    it("should return the sent data", () => {
      expect(response.body.newComment).toEqual(
        expect.objectContaining(testCommentData)
      );
    });
    it("returned comment should match database entry", async () => {
      const commentInDb = await Comment.findOne({
        where: { id: response.body.newComment.id },
      });
      expect(commentInDb.id).toEqual(response.body.newComment.id);
    });
  });

  describe("DELETE /comments/:id", () => {
    describe("delete comments with correct user id", () => {
      let response;
      beforeAll(async () => {
        response = await request(app).delete("/comments/3");
      });
      it("should delete the comment matching the given id", async () => {
        expect(await Comment.findOne({ where: { id: 3 } })).toBeNull();
      });
      it("should return confirmation message", () => {
        expect(response.text).toBe("Comment with id 3 deleted");
      });
    });
    describe("delete comments with incorrect user id", () => {
      let response;
      beforeAll(async () => {
        response = await request(app).delete("/comments/1");
      });
      it("should return no permission error message", () => {
        expect(response.text).toBe(
          "You do not have permission to delete this comment"
        );
      });
    });
  });

  describe("PUT /comments/:id", () => {
    describe("update comment with correct user id", () => {
      const testCommentData = {
        body: "This is the updated test comment",
      };
      let response;
      beforeAll(async () => {
        response = await request(app).put("/comments/5").send(testCommentData);
      });
      it("should update the Comment matching the given id", () => {
        const { updatedComment } = response.body;
        expect(updatedComment.id).toBe(5);
        expect(updatedComment.body).toEqual(testCommentData.body);
      });
    });

    describe("update comment with incorrect user id", () => {
      const testCommentData = {
        body: "This is the updated test comment",
      };
      let response;
      beforeAll(async () => {
        response = await request(app).put("/comments/4").send(testCommentData);
      });
      it("should return no permission error message", () => {
        expect(response.text).toBe(
          "You do not have permission to update this comment"
        );
      });
    });

    describe("update non-existent comment", () => {
      const testCommentData = {
        body: "This is the updated test comment",
      };
      it("should return a 404 error message if the comment does not exist", async () => {
        const response = await request(app)
          .put("/comments/99")
          .send(testCommentData);
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("Comment not found");
      });
    });
  });
});
