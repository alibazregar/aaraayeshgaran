const expressValidator = require("express-validator");
check = expressValidator.check;
module.exports = new (class {
  addAddress() {
    return [
      check("receiverName").not().isEmpty().withMessage("نام گیرنده را وارد کنید"),
      check("receiverPhone").not().isEmpty().withMessage("شماره گیرنده را وارد کنید"),
      check("state").not().isEmpty().withMessage("استان خود را وارد کنید"),
      check("city").not().isEmpty().withMessage("شهر خود را وارد کنید"),
      check("address").not().isEmpty().withMessage("آدرس را وارد کنید"),
      check("postCode").not().isEmpty().withMessage("کد پستی را وارد کنید"),
    ];
  }
})();
