const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const { jwt } = require("../configs/auth");

function ensureAuthenticated(req, response, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("JWT token não informado", 401);
  }
  const [_, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, jwt.secret);
    req.user = {
      id: Number(user_id),
    };
    return next();
  } catch {
    throw new AppError("JWT token Inválido", 401);
  }
}

module.exports = ensureAuthenticated;
