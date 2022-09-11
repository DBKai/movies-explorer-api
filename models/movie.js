const mongoose = require('mongoose');
const { isURL } = require('validator');
const { URL_INCORRECTED } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator: (v) => isURL(v),
      message: () => URL_INCORRECTED,
    },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: {
      validator: (v) => isURL(v),
      message: () => URL_INCORRECTED,
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator: (v) => isURL(v),
      message: () => URL_INCORRECTED,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

exports.Movie = mongoose.model('movie', movieSchema);
