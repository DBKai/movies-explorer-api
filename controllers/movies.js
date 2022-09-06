const { Movie } = require('../models/movie');

// Возвращает все сохранённые текущим  пользователем фильмы
exports.getMoviesByUserId = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const movies = await Movie.findById(userId);
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};
