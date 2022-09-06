const express = require('express');
const moviesController = require('../controllers/movies');

const movieRouters = express.Router();

movieRouters.get('/', moviesController.getMoviesByUserId);

module.exports = {
  movieRouters,
};
