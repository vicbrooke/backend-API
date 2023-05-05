const request = require("supertest");
// express app
const app = require("../server");

// db setup
const seed = require("../db/seedFn");

describe("login", () => {
  beforeAll(async () => {
    // rebuild db before the test suite runs
    await seed();
  });

  describe("POST /login", () => {
    const loginInfo = {
      email: "joebloggs@example.com",
      password: "Password!23",
    };
    it("should return token", async () => {
      // make a request
      const response = await request(app).post("/login").send(loginInfo);
      // assert a response code
      expect(response.status).toBe(202);
      // expect a token response
      expect(response.body.token).toBeDefined();
      // expect a user repsonse
      expect(response.body.user).toBeDefined();
    });
    it("should return a 401 status code and error message for invalid credentials", async () => {
      const invalidLoginInfo = {
        email: "invalid@example.com",
        password: "password123",
      };
      // make a request
      const response = await request(app).post("/login").send(invalidLoginInfo);
      // assert a response code
      expect(response.status).toBe(401);
      // expect a response
      expect(response.text).toContain("Invalid email or password");
    });
  });
});
