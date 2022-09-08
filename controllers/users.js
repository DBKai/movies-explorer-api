const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const IncorrectDataError = require('../errors/incorrect-data-error');
const DuplicateKeyError = require('../errors/duplicate-key-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

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

// Создает пользователя и хеширует пароль
exports.createUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    // Здесь проверка на email проводится перед хэшированием пароля,
    // т.к. хеширование пароля более ресурсоемкая задача, чем поиск по email.
    const foundedEmail = await User.find({ email });
    if (foundedEmail.length > 0) {
      throw new DuplicateKeyError('Пользователь с указанным email уже существует');
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, name, password: hash });
    return res.send({ _id: user._id, email: user.email, name: user.name });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new IncorrectDataError('Переданы некорректные данные для создания пользователя'));
    }
    if (err.code === 11000) {
      return next(new DuplicateKeyError('Пользователь с указанным email уже существует'));
    }
    return next(err);
  }
};

// Авторизует пользователя по jwt
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const foundedUser = await User.findOne({ email }).select('+password');
    if (!foundedUser) {
      throw new NotFoundError('Неправильная почта или пароль');
    }
    const matched = await bcrypt.compare(password, foundedUser.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильная почта или пароль');
    }
    const token = jwt.sign(
      { _id: foundedUser._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    return res.status(200).send({ token });
  } catch (err) {
    return next(err);
  }
};
