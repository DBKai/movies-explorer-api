require('dotenv').config();

const {
  PORT = 3000,
  DATABASE_ADDRESS = 'mongodb://localhost:27017/moviedb',
  JWT_SECRET = 'dev-secret',
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  PORT, DATABASE_ADDRESS, JWT_SECRET, NODE_ENV,
};
