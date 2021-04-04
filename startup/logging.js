const winston = require('winston'); // logger object or a transport 
require('winston-mongodb'); // logger object or a transport 
require('express-async-errors');

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtException.log' }));
    
  process.on('unhanandledRejection', (ex) => {
    throw ex;
  });
  
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
  winston.add(new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" }));
};