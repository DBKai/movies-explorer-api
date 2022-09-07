const express = require('express');
const userController = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

const userRouters = express.Router();

userRouters.get('/me', userController.getCurrentUser);
userRouters.patch('/me', updateUserValidation, userController.updateUser);

module.exports = {
  userRouters,
};
