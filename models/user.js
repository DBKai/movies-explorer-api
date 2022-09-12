const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { EMAIL_INCORRECTED } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: () => EMAIL_INCORRECTED,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

exports.User = mongoose.model('user', userSchema);
