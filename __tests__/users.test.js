const request = require("supertest");
// express app
const app = require("../server");
const bcrypt = require("bcrypt");

// jest mocking of user
jest.mock("../middleware/oidcAuth");
jest.mock("../middleware/oidcRequiresAuth");

// db setup
const seed = require("../db/seedFn");
const { users, comments } = require("../db/seedData");
const { User } = require("../db/models");
const { articles } = require("../db/seedData");

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
      expect(response.body.users[0]).not.toHaveProperty("password");
    });
  });

  describe("GET /users/:id", () => {
    describe("get own user data", () => {
      let response;
      beforeEach(async () => {
        response = await request(app).get("/users/1");
      });
      it("should return a single user", async () => {
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.user).toEqual(expect.objectContaining(users[0]));
      });
      it("should return the associated comment data", () => {
        expect(response.body.user.comments).toBeDefined();
        // filtering the comments array by userId then mapping over the elements of the filtered comments array and creating expect.objectContaining matchers for each comment object
        const expectedComments = comments
          .filter((comment) => comment.userId === 1)
          .map((comment) => expect.objectContaining(comment));
        // check if the response.body.article.comments array contains objects with properties matching the expected comments, while ignoring any additional properties
        expect(response.body.user.comments).toEqual(
          expect.arrayContaining(expectedComments)
        );
      });
      it("should return the associated article data", () => {
        expect(response.body.user.articles).toBeDefined();
        // filtering the articles array by userId then mapping over the elements of the filtered articles array and creating expect.objectContaining matchers for each article object
        const expectedArticles = articles
          .filter((article) => article.userId === 1)
          .map((article) => expect.objectContaining(article));
        // check if the response.body.user.articles array contains objects with properties matching the expected articles, while ignoring any additional properties
        expect(response.body.user.articles).toEqual(
          expect.arrayContaining(expectedArticles)
        );
      });
    });
    describe("try to get another user's data", () => {
      let response;
      beforeEach(async () => {
        response = await request(app).get("/users/2");
      });
      it("should return no permission error message", () => {
        expect(response.text).toBe(
          "You do not have permission to view this user"
        );
      });
    });
  });

  describe("POST /users", () => {
    const testUserData = {
      username: "testuser",
      name: "Test User",
      email: "test.user@test.com",
      avatar_URL: "https://example.com/avatar/testuser.jpg",
    };
    let response;
    beforeEach(async () => {
      response = await request(app).post("/users").send(testUserData);
    });

    it("should return the sent data", () => {
      const { password, ...expectedUserData } = testUserData;
      expect(response.body.newUser).toEqual(
        expect.objectContaining(testUserData)
      );
    });
    it("returned user should match database entry", async () => {
      const { newUser } = response.body;
      const userInDb = await User.findOne({ where: { id: newUser.id } });
      expect(userInDb.id).toEqual(newUser.id);
      expect(userInDb.username).toEqual(newUser.username);
      expect(userInDb.name).toEqual(newUser.name);
      expect(userInDb.email).toEqual(newUser.email);
      expect(userInDb.avatar_URL).toEqual(newUser.avatar_URL);
      // const passwordMatches = await bcrypt.compare(
      //   testUserData.password,
      //   userInDb.password
      // );
      // expect(passwordMatches).toBe(true);
    });
  });

  describe("DELETE /users/:id", () => {
    describe("delete user with correct user id", () => {
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

    describe("delete user with incorrect user id", () => {
      let response;
      beforeAll(async () => {
        response = await request(app).delete("/users/2");
      });
      it("should return no permission error message", () => {
        expect(response.text).toBe(
          "You do not have permission to delete this user"
        );
      });
    });
  });

  describe("PUT /users/:id", () => {
    describe("update user with correct user id", () => {
      const testUserData = {
        username: "Testuser",
        name: "Test User",
        email: "test.user@test.com",
      };
      let response;
      beforeAll(async () => {
        // reseed database to replace user deleted in previous test
        await seed();
        response = await request(app).put("/users/1").send(testUserData);
      });
      it("should update the User matching the given id", () => {
        const { updatedUser } = response.body;
        expect(updatedUser.id).toBe(1);
        expect(updatedUser.username).toEqual(testUserData.username);
        expect(updatedUser.name).toEqual(testUserData.name);
        expect(updatedUser.email).toEqual(testUserData.email);
      });
      it("should return a 404 error message if the User does not exist", async () => {
        const response = await request(app).put("/users/99").send(testUserData);
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe("User not found");
      });
    });

    describe("update user with incorrect user id", () => {
      const testUserData = {
        username: "Testuser",
        name: "Test User",
        email: "test.user@test.com",
      };
      let response;
      beforeAll(async () => {
        response = await request(app).put("/users/2").send(testUserData);
      });
      it("should return no permission error message", () => {
        expect(response.text).toBe(
          "You do not have permission to update this user"
        );
      });
    });
  });
});
