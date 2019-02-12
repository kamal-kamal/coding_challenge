const ProductService = require('./ProductService');

let instance;

if (!instance) {
  instance = new ProductService();
}

module.exports = instance;