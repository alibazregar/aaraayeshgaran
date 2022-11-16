const controller = require("./../controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendCode = require("./../../../utils/sendMessage");

module.exports = new (class extends controller {
  async signUp(req, res) {
    try {
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
    } catch (error) {
      console.log("signUp error : " + error);
      return res.status(500).json({ message: "خطای سرور", result: null });
    }
  }
  async sendVerifyCode(req, res) {
    try {
      const user = await this.User.findOne({ phone: req.body.phone });

      if (!user) {
        return res
          .status(400)
          .json({ message: "کاربری با این شماره یافت نشد" });
      }
      if (user.isVerified == true) {
        return res.status(400).json({
          message: "حساب شما تایید شده است",
        });
      }
      await this.Code.deleteMany({ phone: req.body.phone });
      const randomCode = Math.floor(Math.random() * (999999 - 99999)) + 100000;
      const newCode = new this.Code({
        phone: req.body.phone,
        code: randomCode,
      });
      await newCode.save();
      try {
        await sendCode(randomCode, req.body.phone);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      return res
        .status(200)
        .json({ message: "کد با موفقیت ارسال شد", result: null });
    } catch (error) {
      console.log("send verify code error : " + error);
      return res.status(500).json({ message: "خطای سرور", result: null });
    }
  }
  async verify(req, res) {
    try {
      const user = await this.User.findOne({ phone: req.body.phone });
      if (!user) {
        return res
          .status(400)
          .json({ message: "کاربر یافت نشد", result: null });
      }
      const existedCode = await this.Code.findOne({ phone: req.body.phone });
      if (!existedCode) {
        return res.status(400).json({
          message: "کد یافت نشد. دوباره روی ارسال کد بزنید",
          result: null,
        });
      }
      if (existedCode.code == req.body.code) {
        user.isVerified = true;
        const saved = await user.save();
        const token = jwt.sign(
          {
            id: saved._id,
          },
          process.env.AUTH_SECRET_KEY,
          { expiresIn: "10d" }
        );
        await existedCode.delete();
        return res
          .status(201)
          .json({ message: "کاربر با موفقیت تایید شد", result: token });
      } else {
        return res
          .status(400)
          .json({ message: "کد اشتباه است یا منقضی شده است", result: null });
      }
    } catch (error) {
      console.log("user verify error : " + error);
      return res.status(500).json({ message: "خطای سرور", result: null });
    }
  }
  async login(req, res) {
    try {
      const { phone, password } = req.body;
      const user = await this.User.findOne({ phone: phone });
      if (!user) {
        return res.status(400).json({
          message: "شماره تلفن یا رمز کاربری اشتباه است",
          result: null,
        });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).json({
          message: "رمز کاربر یا شماره تلفن اشتباه است",
          result: null,
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "10d" }
      );
      return res
        .status(200)
        .json({ message: "با موفقیت وارد شدید", result: token });
    } catch (error) {
      console.log("login error : " + error);
      return res.status(500).json({ message: "خطای سرور", result: null });
    }
  }
  async loginWithEmail(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          message: "شماره تلفن یا رمز کاربری اشتباه است",
          result: null,
        });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).json({
          message: "رمز کاربر یا شماره تلفن اشتباه است",
          result: null,
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.AUTH_SECRET_KEY,
        { expiresIn: "10d" }
      );
      return res
        .status(200)
        .json({ message: "با موفقیت وارد شدید", result: token });
    } catch (error) {
      console.log("login error : " + error);
      return res.status(500).json({ message: "خطای سرور", result: null });
    }
  }
})();
