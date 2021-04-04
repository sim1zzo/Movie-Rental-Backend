const config = require('config');
// const morgan = require('morgan');

module.exports = function () {
  // Configuration
console.log(`Applicartion Name: ${config.get('name')}`);
// console.log(`Applicartion Name: ${config.get('mail.host')}`);
// console.log(`Mail Password: ${config.get('mail.password')}`);

// if (app.get('env') === 'development') {
//   app.use(morgan('tiny'));
//   // console.log('Morgan enabled (development)👨‍💻...');
//   startupDebugger('Morgan enabled (development)👨‍💻...');
// }

if (!config.get('jwtPrivateKey')) {
  throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
}
};