const autoBind = require("auto-bind");
const { validationResult, validationBody } = require("express-validator");

const User = require("./../models/user");
const Code = require("./../models/code");
const Brand = require("./../models/brand");
const Category = require("./../models/category");
const Package = require("./../models/package");
const Product = require("./../models/product");
const Comment = require("./../models/comment")

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
