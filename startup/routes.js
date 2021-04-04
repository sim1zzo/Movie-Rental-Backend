const express = require('express');
// const helmet = require('helmet');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const users = require('../routes/users');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const auth = require('../routes/auth');
const error = require('../middlewares/error');


module.exports = function (app) {
  // MIDDLEWARES
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(express.json());
// app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error); // In this way I have a single place to handle errors.
}