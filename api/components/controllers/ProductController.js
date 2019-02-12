const Product = require('../../models/Product');

class ProductController {

  constructor(productService) {
    this.productService = productService;
  }

  /**
   * @param {ExpressRequest} request
   * @param {ExpressResponse} response
   * @param {ExpressNext} next
   * @return {Json}
   */
  getAllProducts(request, response, next) {
    try {
      const products = this.productService.getAllProducts();
      response.json(products);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @param {ExpressRequest} request
   * @param {ExpressResponse} response
   * @param {ExpressNext} next
   * @return {Json}
   */  
  takeOrder(request, response, next) {
    try {
      const { prodId, quantity } = request.body;

      const product = this.productService.getProductDetails(prodId);
      const result = new Product().prepare(product, quantity);
      response.json(result)

    } catch (err) {
      next(err);
    }
  }
  
}

module.exports = ProductController;