const express = require('express');
const ProductController = require('./controllers/ProductController');
const productService = require('../services');

const getRouter = () => {
  const router = express.Router();
  const productController = new ProductController(productService);

  router.get('/products/list', productController.getAllProducts.bind(productController));
  router.post('/products/order', productController.takeOrder.bind(productController));

  return router;
}

module.exports = {
  getRouter
};