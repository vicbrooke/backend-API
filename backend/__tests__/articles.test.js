const request = require("supertest");
// express app
const app = require("../server");
const { db } = require("../db/db");

// db setup
const seed = require("../db/seedFn");
const { articles } = require("../db/seedData");

describe("articles", () => {
  beforeAll(async () => {
    // rebuild db before the test suite runs
    await seed();
  });

  it("should return a list of articles", async () => {
    // make a request
    const response = await request(app).get("/articles");
    // assert a response code
    expect(response.status).toBe(200);
    // expect a response
    expect(response.body).toBeDefined();
    // toEqual checks deep equality in objects
    expect(response.body[0]).toEqual(expect.objectContaining(articles[0]));
    expect(response.body[1]).toEqual(expect.objectContaining(articles[1]));
    expect(response.body[2]).toEqual(expect.objectContaining(articles[2]));
  });
});
