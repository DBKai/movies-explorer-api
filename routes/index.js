const express = require('express');
const { movieRouters } = require('./movies');
const { userRouters } = require('./users');

const indexRouter = express.Router();

indexRouter.use('/users', userRouters);
indexRouter.use('/movies', movieRouters);

module.exports = {
  indexRouter,
};
