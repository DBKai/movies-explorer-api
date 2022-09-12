const express = require('express');
const NotFoundError = require('../errors/not-found-error');
const { SOURCE_NOT_FOUND } = require('../utils/constants');

const notFoundRouters = express.Router();

notFoundRouters.all('*', () => {
  throw new NotFoundError(SOURCE_NOT_FOUND);
});

module.exports = {
  notFoundRouters,
};
