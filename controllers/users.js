const { User } = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const IncorrectDataError = require('../errors/incorrect-data-error');

// Получает информацию о текущем пользователе (email и имя)
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.send(user);
    }
    throw new NotFoundError('Не найден пользователь с указанным id');
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new IncorrectDataError('Передан некорректный id пользователя'));
    }
    return next(err);
  }
};

// Обновляет информацию о текущем пользователе (email и имя)
exports.updateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );
    if (user) {
      return res.send(user);
    }
    throw new NotFoundError('Не найден пользователь с указанным id');
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы некорректные данные при обновлении пользователя'));
    }
    return next(err);
  }
};
