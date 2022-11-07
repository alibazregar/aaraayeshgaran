const controller = require("./../controller");
const bcrypt = require("bcrypt");

module.exports = new (class extends controller {
  async signUp(req, res) {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      req.body;
    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ message: "رمز کاربر با تایید آن برابر نیست" });
    }
    const existedUser = await this.User.findOne({ phone: phone });
    if (existedUser) {
      return res.status(400).json({
        message: "کاربری با اطلاعات شما در سیستم موجود است",
        result: null,
      });
    }
    const existedUserEmail = await this.User.findOne({ email: email });
    if (existedUserEmail) {
      return res.status(400).json({
        message: "کاربری با اطلاعات شما در سیستم موجود است",
        result: null,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new this.User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: hashedPassword,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ message: "کاربر جدید با موفقیت ثبت شد", result: null });
  }
  async sendVerifyCode(req, res) {
    const user = await this.User.findOne({ phone: req.body.phone });

    if (!user) {
      return res.status(400).json({ message: "کاربری با این شماره یافت نشد" });
    }
    if (user.isVerified == true) {
      return res.status(400).json({
        message: "حساب شما تایید شده است",
      });
    }
    const randomCode = Math.floor(Math.random() * (999999 - 99999)) + 100000;
    const newCode = new this.Code({
      phone: req.body.phone,
      code: randomCode,
    });
    await newCode.save();

    return res
      .status(200)
      .json({ message: "کد با موفقیت ارسال شد", result: null });
  }
  async verify(req, res) {}
})();
