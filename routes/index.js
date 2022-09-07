const express = require('express');
const NotFoundError = require('../errors/not-found-error');
const { movieRouters } = require('./movies');
const { userRouters } = require('./users');

const indexRouter = express.Router();

indexRouter.use('/users', userRouters);
indexRouter.use('/movies', movieRouters);
indexRouter.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = {
  indexRouter,
};
