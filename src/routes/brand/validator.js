const expressValidator = require("express-validator");
check = expressValidator.check;
module.exports = new (class {
  addBrand() {
    return [
      check("name")
      .not().isEmpty()
      .withMessage("نام را وارد کنید"),
      check("description")
      .not().isEmpty()
      .withMessage("توضیحات را وارد کنید")
    ];
  }

})();
