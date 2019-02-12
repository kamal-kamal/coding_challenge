const express = require('express');
const config = require('config');

const app = express();

// boot strap all express settings and API endpoints
require('./bootstrap/express-settings')(app);
require('./bootstrap/components')(app);

app.listen(config.get('app.port'), () => {
  console.log('started');
});