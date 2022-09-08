const { celebrate, Joi } = require('celebrate');

exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),
    thumbnail: Joi.string().required(),
    owner: Joi.string().hex().length(24),
    movieId: Joi.string().hex().length(24),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
