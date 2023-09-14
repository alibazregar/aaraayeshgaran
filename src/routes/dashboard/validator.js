const expressValidator = require("express-validator");
check = expressValidator.check;
module.exports = new (class {
  updatePassword() {
    return [
      check("currentPassword")
        .not()
        .isEmpty()
        .withMessage("رمز فعلی را وارد کنید")
        .bail()
        .isLength({ min: 6 })
        .withMessage("رمز فعلی را درست وارد کنید"),
      check("newPassword")
        .not()
        .isEmpty()
        .withMessage("رمز جدید را وارد کنید")
        .bail()
        .isLength({ min: 6 })
        .withMessage("رمز جدید را درست وارد کنید"),
      check("confirmNewPassword")
        .not()
        .isEmpty()
        .withMessage("رمز جدید را تایید کنید")
        .bail()
        .isLength({ min: 6 })
        .withMessage("رمز جدید را درست تایید کنید"),
    ];
  }
})();
