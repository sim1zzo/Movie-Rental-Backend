// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/congif')();
require('./startup/validation')();


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on 🚪 ${port}...`)
});