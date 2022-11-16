const controller = require("../controller");
const fs = require("fs").promises;

module.exports = new (class extends controller {
  async getCategory(req, res) {
    try {
      const skip = req.query.skip;
      const DEFAULT_LIMIT = 10;
      const categories = await this.Category.find({})
        .skip(skip)
        .limit(DEFAULT_LIMIT);

      if (categories.length == 0) {
        return res
          .status(200)
          .json({ message: "موردی برای نمایش وجود ندارد", result: null });
      }
      return res.status(200).json({ message: null, result: categories });
    } catch (err) {
      console.log("get Category error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async getCategoryAndCategoryProducts(req, res) {
    try {
      let minPrice = req.query.MinPrice;
      let maxPrice = req.query.MaxPrice;
      if (!maxPrice) {
        maxPrice = 9999999999;
      }
      if (!minPrice) {
        minPrice = 1;
      }
      const id = req.params.id;
      const skip = req.query.skip;
      const DEFAULT_LIMIT = 10;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "آیدی نامعتبر", result: null });
      }
      const category = await this.Category.findById(id);
      if (!category) {
        return res
          .status(400)
          .json({ message: "دسته بندی یافت نشد", result: null });
      }
      const products = await this.Product.find({
        Category: id,
        price: { $gt: minPrice, $lt: maxPrice },
      })
        .skip(skip)
        .limit(DEFAULT_LIMIT);

      return res
        .status(200)
        .json({ message: null, result: { category, products } });
    } catch (error) {
      console.log(
        "get Category and category products error : " + error.message
      );
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async addCategory(req, res) {
    try {
      const { name, type } = req.body;
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "عکس برند را آپلود کنید", result: null });
      }
      const array = [
        "eyeMakeup",
        "faceMakeup",
        "hairMakeup",
        "makeupStand",
        "mirrorAndMakeupStand",
        "makeupBoxOrBag",
        "hairCare",
        "skinCare",
        "personalHygiene",
        "electricalHairAndBodyRemoval",
        "electricalSkinAndHairCare",
        "electricalHairStylingEquipment",
        "electricalPumice",
        "aerator",
        "brushAndPadWashMachine",
        "faceBrush",
        "eyelashCurler",
        "perfume",
      ];
      let boolean = false;
      for (let validType of array) {
        if (validType == type) {
          boolean = true;
        }
      }

      if (!boolean) {
        return res
          .status(400)
          .json({ message: "تایپ را وارد کنید", result: null });
      }
      const newCategory = new this.Category({
        name: name,
        type: type,
        photo: req.file.path,
      });
      await newCategory.save();
      return res
        .status(200)
        .json({ message: "دسته بندی با موفقیت اضافه شد", result: null });
    } catch (err) {
      console.log("add Category error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async editCategory(req, res) {
    try {
      const id = req.params.id;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "آیدی نامعتبر", result: null });
      }
      const category = await this.Category.findById(id);
      if (!category) {
        return res
          .status(400)
          .json({ message: "دسته بندی یافت نشد", result: null });
      }
      if (req.file) {
        await fs.unlink(category.photo);
        category.photo = req.file.path;
        await category.save();
      }
      await this.Category.updateOne({ _id: id }, req.body);

      return res
        .status(200)
        .json({ message: "با موفقیت به روز رسانی شد", result: null });
    } catch (err) {
      console.log("edit Category error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async deleteCategory(req, res) {
    try {
      const id = req.params.id;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "آیدی نامعتبر", result: null });
      }
      const category = await this.Category.findById(id);
      if (!category) {
        return res.status(400).json({ message: "برند یافت نشد", result: null });
      }

      await fs.unlink(category.photo);
      await category.delete();
      return res
        .status(200)
        .json({ message: "با موفقیت حذف شد", result: null });
    } catch (err) {
      console.log("delete Category error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
})();
