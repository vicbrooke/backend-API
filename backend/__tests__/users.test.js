const request = require("supertest");
// express app
const app = require("../server");

// db setup
const seed = require("../db/seedFn");
const { users } = require("../db/seedData");
const { User } = require("../db/models");

describe("users", () => {
  beforeAll(async () => {
    // rebuild db before the test suite runs
    await seed();
  });

  describe("GET /users", () => {
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

  describe("POST /users", () => {
    const testUserData = {
      username: "testuser",
      name: "Test User",
      password: "testing123",
      email: "test.user@test.com",
      avatar_URL: "https://example.com/avatar/testuser.jpg",
    };
    let response;
    beforeEach(async () => {
      response = await request(app).post("/users").send(testUserData);
    });

    it("should return the sent data", () => {
      expect(response.body).toEqual(expect.objectContaining(testUserData));
    });
    it("returned user should match database entry", async () => {
      const userInDb = await User.findOne({ where: { id: response.body.id } });
      expect(userInDb.id).toEqual(response.body.id);
      expect(userInDb.username).toEqual(response.body.username);
      expect(userInDb.name).toEqual(response.body.name);
      expect(userInDb.password).toEqual(response.body.password);
      expect(userInDb.email).toEqual(response.body.email);
      expect(userInDb.avatar_URL).toEqual(response.body.avatar_URL);
    });
  });
});
