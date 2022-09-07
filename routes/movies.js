const express = require('express');
const moviesController = require('../controllers/movies');
const { userIdValidation, createMovieValidation, movieIdValidation } = require('../middlewares/validation');

const movieRouters = express.Router();

movieRouters.get('/', userIdValidation, moviesController.getMoviesByUserId);
movieRouters.post('/', createMovieValidation, moviesController.createMovie);
movieRouters.delete('/:movieId', movieIdValidation, moviesController.deleteMovie);

module.exports = {
  movieRouters,
};
