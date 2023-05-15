const { auth } = require("express-openid-connect");
const { authConfig } = require("../../authConfig");

module.exports = auth(authConfig);
