require("dotenv").config(".env");

const { BASE_URL, CLIENT_ID, ISSUER_BASE_URL, SECRET } = process.env;

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: BASE_URL,
  clientID: CLIENT_ID,
  issuerBaseURL: ISSUER_BASE_URL,
  secret: SECRET,
};

module.exports = config;
