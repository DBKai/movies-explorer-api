const { User } = require('../models/user');

// Получает информацию о текущем пользователе (email и имя)
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.send(user);
    }
    throw new Error('Не найден пользователь с указанным id');
  } catch (err) {
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
    throw new Error('Не найден пользователь с указанным id');
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new Error('Переданы некорректные данные при обновлении пользователя'));
    }
    return next(err);
  }
};
