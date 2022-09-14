const controller = require("./../controller");

const bcrypt = require("bcrypt");
module.exports = new (class extends controller {
  async signUp(req, res) {
    return res
      .status(200)
      .json({ message: "کاربر جدید با موفقیت ثبت شد", result: null });
  }
  async verify(req, res) {
    
  }
})();
