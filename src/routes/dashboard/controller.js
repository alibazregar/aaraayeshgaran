const controller = require("../controller");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");

module.exports = new (class extends controller {
  async addToCart(req, res) {
    try {
    } catch (error) {
      console.log(`like product Error : ${error}`);
      return res
        .status(500)
        .json({ msg: "متاسفانه ارتباط برقرار نگردید", result: null });
    }
  }
  async getComments(req, res) {
    try {
      const { skip, status } = req.query;
      if (!status) {
        return res
          .status(400)
          .json({ message: "وضعیت را وارد کنید", result: null });
      }
      if (status != "valid" && status != "notValid" && status != "pending") {
        return res.status(400).json({ message: "وضعیت نامعتبر", result: null });
      }

      const DEFAULT_LIMIT = 5;
      const comments = await this.Comment.find({
        status: status,
        user: req.user._id,
      })
        .skip(skip)
        .limit(DEFAULT_LIMIT);
      if (comments.length == 0) {
        return res
          .status(200)
          .json({ message: "موردی یافت نشد", result: null });
      }
      return res.status(200).json({ message: null, result: comments });
    } catch (error) {
      console.log(`get comments Error : ${error}`);
      return res
        .status(500)
        .json({ msg: "متاسفانه ارتباط برقرار نگردید", result: null });
    }
  }
  async editUser(req, res) {
    try {
      const { password } = req.body;
      if (password) {
        return res.status(400).json({
          message: "ویرایش پسورد در اینجا امکان پذیر نیست",
        });
      }
      await this.User.updateOne({ _id: req.user._id }, req.body);
      return res
        .status(200)
        .json({ message: "به روز رسانی با موفقیت انجام شد", result: null });
    } catch (error) {
      console.log(`edit User Error : ${error}`);
      return res
        .status(500)
        .json({ msg: "متاسفانه ارتباط برقرار نگردید", result: null });
    }
  }
  async getUser(req, res) {
    try {
      const user = await this.User.findById(req.user._id);
      return res.status(200).json({ message: null, result: user });
    } catch (error) {
      console.log(`get User Error : ${error}`);
      return res
        .status(500)
        .json({ msg: "متاسفانه ارتباط برقرار نگردید", result: null });
    }
  }
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword, confirmNewPassword } = req.body;
      if (newPassword !== confirmNewPassword) {
        return res
          .status(400)
          .json({
            message: "رمز جدید و تکرار آن باید یکسان باشد",
            result: null,
          });
      }
      const user = await this.User.findById(req.user._id);
      const isValid = await bcrypt.compare( currentPassword,user.password);
      if (!isValid) {
        return res
          .status(400)
          .json({ message: "رمز عبور قدیمی اشتباه است", result: null });
      }
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = newHashedPassword;
      await user.save();
      return res.status(200).json({ message: "رمز ورود با موفقیت تغییر یافت", result: null})
    } catch (error) {
      console.log(`edit User Error : ${error}`);
      return res
        .status(500)
        .json({ msg: "متاسفانه ارتباط برقرار نگردید", result: null });
    }
  }
})();
