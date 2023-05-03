const request = require("supertest");
// express app
const app = require("../server");

// db setup
const seed = require("../db/seedFn");
const { users } = require("../db/seedData");

describe("users", () => {
  beforeAll(async () => {
    // rebuild db before the test suite runs
    await seed();
  });

  it("should return a list of users", async () => {
    // make a request
    const response = await request(app).get("/users");
    // assert a response code
    expect(response.status).toBe(200);
    // expect a response
    expect(response.body).toBeDefined();
    // toEqual checks deep equality in objects
    expect(response.body[0]).toEqual(expect.objectContaining(users[0]));
    expect(response.body[1]).toEqual(expect.objectContaining(users[1]));
    expect(response.body[2]).toEqual(expect.objectContaining(users[2]));
  });
});
