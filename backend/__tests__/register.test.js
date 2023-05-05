const request = require("supertest");
// express app
const app = require("../server");

// db setup
const seed = require("../db/seedFn");

describe("register", () => {
  beforeAll(async () => {
    // rebuild db before the test suite runs
    await seed();
  });

  describe("POST /register", () => {
    const registerInfo = {
      email: "test.user@example.com",
      password: "Password!234",
    };
    it("should return token", async () => {
      // make a request
      const response = await request(app).post("/register").send(registerInfo);
      // assert a response code
      expect(response.status).toBe(201);
      // expect a token response
      expect(response.body.token).toBeDefined();
      // expect a user response
      expect(response.body.user).toBeDefined();
    });
  });
});
