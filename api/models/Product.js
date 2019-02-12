
/**
 * @class Product
 * @property {Object} prod
 * @property {Number} quantity
 */

class Product {
  constructor() {}

  prepare(prod, quantity) {
    const product = prod.product;

    this.minimumQuantity = prod.discount.minimumQuantity;
    const offer = prod.discount.offer;
    
    this.dss = prod.discount;
    this.itemName = product.eventName;
    this.orderedQuantity = quantity;
    this.offeredQuantity = quantity;
    this.pricePerItem = product.price;
    this.price = product.price * quantity;
    this.priceAfterDiscount = this._calculateFinalPrice(offer);

    return this;
  }

  _calculateFinalPrice(offer) {
    // If requested quantity is higher than minimum quantity in Offer
    // Method is used to calculate final price after discount or add quantity
    // Rule 1 - if Offer has exact discount then it will be returned as final price
    // Rule 2 - if Offer adds quantity (buy 2 get 1) then quantity is added.
    // Rule 3 - if Offer has % discount on minimum quantity, final price will be returned accordingly.
    // Rule 3 - if Offer has % discount on total quantity, final price will be returned accordingly.
    if (this.orderedQuantity >= this.minimumQuantity) {
      if (offer.exactPrice) {
        return this._fixedDiscount(offer.exactPrice);
      }
      if (offer.addExtraQuantity) {
        this._setQuantity(this.orderedQuantity);
      }
      if (offer.percentageOnSingle) {
        return this._percentOnSingle(this.orderedQuantity, offer.percentageOnSingle);
      }
      if (offer.percentageOnAll) {
        return this._percentOnAll(offer.percentageOnAll);
      }

    }
    return this.price;
  }

  _fixedDiscount(exactPrice) {
    let totalPrice;
    const division = Number.parseInt(this.orderedQuantity / this.minimumQuantity);
    const mod = this.orderedQuantity % this.minimumQuantity;
    totalPrice = exactPrice * division;
    if (mod) {
      totalPrice = totalPrice + (mod * this.pricePerItem);
    }
    return totalPrice;
  }

  _setQuantity(quantity) {
    const division = Number.parseInt(quantity / this.minimumQuantity);
    const mod = quantity % this.minimumQuantity;
    this.offeredQuantity = quantity + division + mod;
  }

  _percentOnSingle(quantity, percent) {
    const division = Number.parseInt(quantity / this.minimumQuantity);
    const discount = ((this.pricePerItem * percent) / 100) * this.minimumQuantity * division;
    const totalPrice = this.price - discount;
    return totalPrice;
  }

  _percentOnAll(percent) {
    const discount = ((this.price * percent) / 100);
    return this.price - discount;
  }
}

module.exports = Product;