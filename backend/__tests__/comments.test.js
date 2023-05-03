const request = require("supertest");
// express app
const app = require("../server");

// db setup
const seed = require("../db/seedFn");
const { comments } = require("../db/seedData");

describe("users", () => {
  beforeAll(async () => {
    // rebuild db before the test suite runs
    await seed();
  });

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
