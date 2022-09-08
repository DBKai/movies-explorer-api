const IncorrectDataError = require('../errors/incorrect-data-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { Movie } = require('../models/movie');

// Возвращает все сохранённые текущим пользователем фильмы
exports.getMoviesByUserId = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const movies = await Movie.find({ owner: userId });
    if (!movies) {
      throw new NotFoundError('Не найден фильм с указанным id');
    }
    return res.send(movies);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new IncorrectDataError('Передан некорректный id пользователя'));
    }
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
      thumbnail, nameRU, nameEN,
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
      nameRU,
      nameEN,
    });
    return res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы некорректные данные при создании фильма'));
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
      throw new NotFoundError('Фильм с указанным id не найден');
    }
    const isOwner = movie.owner.toString() === req.user._id;
    if (!isOwner) {
      throw new ForbiddenError('Нельзя удалить чужой фильм');
    }
    await Movie.deleteOne({ _id: movieId });
    return res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new IncorrectDataError('Переданы некорректные при удалении фильма'));
    }
    return next(err);
  }
};
