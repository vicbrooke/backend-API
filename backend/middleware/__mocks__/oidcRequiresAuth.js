module.exports = jest.fn((req, res, next) => {
  if (!req.oidc?.user) {
    return res.sendStatus(403);
  }
  next();
});
