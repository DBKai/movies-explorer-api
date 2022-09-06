const express = require('express');
const userController = require('../controllers/users');

const userRouters = express.Router();

userRouters.get('/me', userController.getCurrentUser);
userRouters.patch('/me', userController.updateUser);

module.exports = {
  userRouters,
};
