const request = require("supertest");
// express app
const app = require("../server");
const bcrypt = require("bcrypt");

// db setup
const seed = require("../db/seedFn");
const { users } = require("../db/seedData");
const { User } = require("../db/models");

describe("login", () => {
  beforeAll(async () => {
    // rebuild db before the test suite runs
    await seed();
  });

  describe("POST /login", () => {
    const loginInfo = {
      email: "joebloggs@example.com",
      password: "password123",
    };
    it("should return token", async () => {
      // make a request
      const response = await request(app).post("/login").send(loginInfo);
      // assert a response code
      expect(response.status).toBe(202);
      // expect a response
      expect(response.body).toBeDefined();
    });
    it("should return a 401 status code and error message for invalid credentials", async () => {
      const invalidLoginInfo = {
        email: "invalid@example.com",
        password: "password123",
      };

      const response = await request(app).post("/login").send(invalidLoginInfo);

      expect(response.status).toBe(401);
      expect(response.text).toContain("Invalid email or password");
    });
  });
});
