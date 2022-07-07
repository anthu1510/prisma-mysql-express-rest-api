const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.EXPIRE_ACCESS_TOKEN_TIME,
    });
  },
  generateRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.EXPIRE_REFRESH_TOKEN_TIME,
    });
  },
};
