const jwt = require("jsonwebtoken");

exports.generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_ACCESS_TOKEN_TIME,
  });
};

exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.EXPIRE_REFRESH_TOKEN_TIME,
  });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

exports.newTokens = (refreshtoken) => {
  let result = null;

  if (!refreshtoken) result = false;

  jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, rs) => {
    if (err) throw err;
    result = rs;
  });

  return result;
};
