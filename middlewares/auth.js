const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { AUTHORIZATION_NEEDED } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = require('../configuration');

// Проверяет пришедший с клиента jwt
exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(AUTHORIZATION_NEEDED);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(err);
  }
  req.user = payload;
  return next();
};
