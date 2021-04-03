const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const mongoose = require('mongoose');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
// const logger = require('./middlewares/logger');
const genres = require('./routes/genres')
const home = require('./routes/home')
const customers = require('./routes/customers');
const users = require('./routes/users');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
// app.set('views', './views'); //default -> is optional


mongoose.connect('mongodb://localhost/vidly', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('Connected to MongoDb...'))
  .catch(err => console.error("Cannot connect to DB ", err));

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app ${app.get('env')}`);

// MIDDLEWARES
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(helmet());
// app.use(logger);
app.use('/api/movies', movies);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/', home);




// Configuration
console.log(`Applicartion Name: ${config.get('name')}`);
// console.log(`Applicartion Name: ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  // console.log('Morgan enabled (development)👨‍💻...');
  startupDebugger('Morgan enabled (development)👨‍💻...');
}

// dbDebugger('Connected to the database');


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on 🚪 ${port}...`)
});