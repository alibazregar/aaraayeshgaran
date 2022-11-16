const expressValidator = require("express-validator");
check = expressValidator.check;
module.exports = new (class {
  addProduct() {
    return [
      check("name")
      .not().isEmpty()
      .withMessage("نام را وارد کنید"),
    ];
  }

})();
