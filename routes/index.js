const express = require('express');
const NotFoundError = require('../errors/not-found-error');
const { movieRouters } = require('./movies');
const { userRouters } = require('./users');
const users = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

const indexRouter = express.Router();

indexRouter.use('/users', auth, userRouters);
indexRouter.use('/movies', auth, movieRouters);
indexRouter.post('/signup', createUserValidation, users.createUser);
indexRouter.post('/signin', loginValidation, users.login);
indexRouter.use('*', auth, () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = {
  indexRouter,
};
