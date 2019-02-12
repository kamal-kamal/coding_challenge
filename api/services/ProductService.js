const config = require('config');

class ProductService {
  
  constructor(){}

  getAllProducts() {
    return [
      { prodId: 1, eventName: 'Kids Party', price: 220 },
      { prodId: 2, eventName: 'Wine Tour', price: 440 },
      { prodId: 3, eventName: 'Team Building', price: 800 },
      { prodId: 4, eventName: 'Picnic', price: 110 }
    ]
  }

  getProductPrice(id) {
    return this.getAllProducts().find((item) => item.prodId === id).map((item) => item.price);
  }

  getProductDetails(id) {
    const product = this.getAllProducts().find((item) => item.prodId === id);
    return {
      product,
      offer: {
        minimumQuantity: config.get(`products.item_${id}.minimum`),
        rules: {
          fixedDiscount: config.get(`products.item_${id}.fixedDiscount`),
          addExtraQuantity: config.get(`products.item_${id}.addQuanity`),
          percentageOnSingle: config.get(`products.item_${id}.percentOnSingle`),
          percentageOnAll: config.get(`products.item_${id}.percentOnAll`)
        }
      }
    }
  }
}

module.exports = ProductService;