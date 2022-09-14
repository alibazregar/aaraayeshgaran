const autoBind = require("auto-bind");
const { validationResult, validationBody } = require("express-validator");

const User = require("./../models/user");

module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
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
