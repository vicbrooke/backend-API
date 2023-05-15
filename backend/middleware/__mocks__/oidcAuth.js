const { users } = require("../../db/seedData");
module.exports = jest.fn((req, res, next) => {
  req.oidc = { user: users[0] };
  next();
});
