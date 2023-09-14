const autoBind = require("auto-bind");
const { validationResult, validationBody } = require("express-validator");

const User = require("./../models/user");
const Code = require("./../models/code");
const Brand = require("./../models/brand");
const Category = require("./../models/category");
const Package = require("./../models/package");
const Product = require("./../models/product");
const Comment = require("./../models/comment")
const Cart  = require("./../models/cart")
const FavoriteProduct = require("./../models/favoriteProduct")
const UserAddress = require("./../models/userAddress")
const Payment = require("./../models/payment")
const  CompletedCart =  require("./../models/completedCart")

module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
    this.Code = Code;
    this.Comment = Comment;
    this.Product = Product;
    this.Package = Package;
    this.Brand = Brand;
    this.Category = Category;
    this.Cart = Cart;
    this.FavoriteProduct = FavoriteProduct;
    this.UserAddress = UserAddress;
    this.Payment = Payment;
    this.CompletedCart = CompletedCart;
  }
  validationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const messages = [];
      errors.forEach((err) => messages.push(err.msg));
      res.status(400).json({
        message: messages,
        result: null,
      });
      return false;
    }
    return true;
  }
  validate(req, res, next) {
    if (!this.validationBody(req, res)) {
      return;
    }
    next();
  }
};
