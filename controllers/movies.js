const IncorrectDataError = require('../errors/incorrect-data-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { Movie } = require('../models/movie');
const {
  MOVIE_NOT_FOUND,
  CREATE_MOVIE_DATA_INCORRECTED,
  DELETE_MOVIE_NOT_GRANTED,
  DELETE_MOVIE_DATA_INCORRECTED,
} = require('../utils/constants');

// Возвращает все сохранённые текущим пользователем фильмы
exports.getMoviesByUserId = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const movies = await Movie.find({ owner: userId });
    if (!movies) {
      throw new NotFoundError(MOVIE_NOT_FOUND);
    }
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

// Создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail
exports.createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country, director, duration, year, description, image, trailerLink,
      movieId, thumbnail, nameRU, nameEN,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });
    return res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectDataError(CREATE_MOVIE_DATA_INCORRECTED));
    }
    return next(err);
  }
};

// Удаляет фильм с указанным id
exports.deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findOne({ _id: movieId });
    if (!movie) {
      throw new NotFoundError(MOVIE_NOT_FOUND);
    }
    const isOwner = movie.owner.toString() === req.user._id;
    if (!isOwner) {
      throw new ForbiddenError(DELETE_MOVIE_NOT_GRANTED);
    }
    await Movie.deleteOne({ _id: movieId });
    return res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new IncorrectDataError(DELETE_MOVIE_DATA_INCORRECTED));
    }
    return next(err);
  }
};
