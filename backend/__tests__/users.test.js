const request = require("supertest");
// express app
const app = require("../server");
const bcrypt = require("bcrypt");

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

      expect(response.body.users[0].name).toEqual(users[0].name);
      expect(response.body.users[0].email).toEqual(users[0].email);
      expect(response.body.users[0].username).toEqual(users[0].username);
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
      const { password, ...expectedUserData } = testUserData;
      expect(response.body).toEqual(expect.objectContaining(expectedUserData));
    });
    it("returned user should match database entry", async () => {
      const userInDb = await User.findOne({ where: { id: response.body.id } });
      expect(userInDb.id).toEqual(response.body.id);
      expect(userInDb.username).toEqual(response.body.username);
      expect(userInDb.name).toEqual(response.body.name);
      expect(userInDb.email).toEqual(response.body.email);
      expect(userInDb.avatar_URL).toEqual(response.body.avatar_URL);
      const passwordMatches = await bcrypt.compare(
        testUserData.password,
        userInDb.password
      );
      expect(passwordMatches).toBe(true);
    });
  });

  describe("DELETE /users/:id", () => {
    let response;
    beforeAll(async () => {
      response = await request(app).delete("/users/1");
    });
    it("should delete the user matching the given id", async () => {
      expect(await User.findOne({ where: { id: 1 } })).toBeNull();
    });
    it("should return confirmation message", () => {
      expect(response.text).toBe("User with id 1 deleted");
    });
  });

  describe("PUT /users/:id", () => {
    const testUserData = {
      username: "Testuser",
      name: "Test User",
      email: "test.user@test.com",
    };
    let response;
    beforeAll(async () => {
      response = await request(app).put("/users/2").send(testUserData);
    });
    it("should update the User matching the given id", () => {
      expect(response.body.id).toBe(2);
      expect(response.body.username).toEqual(testUserData.username);
      expect(response.body.name).toEqual(testUserData.name);
      expect(response.body.email).toEqual(testUserData.email);
    });
    it("should return a 404 error message if the User does not exist", async () => {
      const response = await request(app).put("/users/99").send(testUserData);
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe("User not found");
    });
  });
});
