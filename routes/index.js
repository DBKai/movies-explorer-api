const express = require('express');
const { movieRouters } = require('./movies');
const { userRouters } = require('./users');
const { notFoundRouters } = require('./notFound');
const users = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

const indexRouter = express.Router();

indexRouter.use('/users', auth, userRouters);
indexRouter.use('/movies', auth, movieRouters);
indexRouter.post('/signup', createUserValidation, users.createUser);
indexRouter.post('/signin', loginValidation, users.login);
indexRouter.use('*', auth, notFoundRouters);

module.exports = {
  indexRouter,
};
