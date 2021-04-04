require('express-async-errors');
const winston = require('winston'); // logger object or a transport 
require('winston-mongodb'); // logger object or a transport 
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');

const config = require('config');
const morgan = require('morgan');

const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();

winston.exceptions.handle(
  new winston.transports.File({ filename: 'uncaughtException.log' }));
  
process.on('unhanandledRejection', (ex) => {
  throw ex;
});


winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(
  new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
);


app.set('view engine', 'pug');
// app.set('views', './views'); //default -> is optional


// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app ${app.get('env')}`);






// Configuration
console.log(`Applicartion Name: ${config.get('name')}`);
// console.log(`Applicartion Name: ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  // console.log('Morgan enabled (development)👨‍💻...');
  startupDebugger('Morgan enabled (development)👨‍💻...');
}

if (!config.get('jwtPrivateKey')) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1); // 0 indicate success all the rest failure
}

// dbDebugger('Connected to the database');
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on 🚪 ${port}...`)
});