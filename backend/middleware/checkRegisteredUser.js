const { User } = require("../db/models");

exports.checkRegisteredUser = async (req, res, next) => {
  if (req.oidc?.user) {
    try {
      const [user] = await User.findOrCreate({
        where: {
          username: req.oidc.user.username || req.oidc.user.nickname,
          name: req.oidc.user.name,
          email: req.oidc.user.email,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  next();
};
