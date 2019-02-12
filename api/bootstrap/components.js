const components = require('../components');

/**
 * @param {Function} app
 * @param {Function} app.use
 */
module.exports = (app) => {
  app.use('/api', components.getRouter());
};