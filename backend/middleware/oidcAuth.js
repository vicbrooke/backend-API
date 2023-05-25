// provides authentication functionality using OpenID Connect
const { auth } = require("express-openid-connect");
const config = require("../authConfig");

module.exports = auth(config);
