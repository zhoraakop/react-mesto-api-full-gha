const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'SECRET_KEY' } = process.env;

const UnauthorizedError = require('../errors/Unauthorized-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
