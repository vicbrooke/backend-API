// provides authentication functionality using OpenID Connect
const { requiresAuth } = require("express-openid-connect");

module.exports = requiresAuth();
