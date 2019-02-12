
const bodyParser = require('body-parser');
const cors = require('cors')

/**
 * @param {Function} app
 * @param {Function} app.use
 */
module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
}