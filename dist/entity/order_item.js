"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(id, name, price, quantity, productId) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._productId = productId;
    }
    get price() {
        // return this._price;
        return this._price * this._quantity;
    }
    get quantity() {
        return this._quantity;
    }
    orderItemTotal() {
        return this._price * this._quantity;
    }
}
exports.default = OrderItem;
