const controller = require("../controller");
const fs = require("fs").promises;

module.exports = new (class extends controller {
  async getProducts(req, res) {
    try {
      let minPrice = req.query.MinPrice;
      let maxPrice = req.query.MaxPrice;
      let brandId = req.query.BrandId;
      let categoryId = req.query.categoryId;
      if (!maxPrice) {
        maxPrice = 9999999999;
      }
      if (!minPrice) {
        minPrice = 1;
      }
      let queryObject = { price: { $gt: minPrice, $lt: maxPrice } };
      if (brandId) {
        if (!brandId.match(/^[0-9a-fA-F]{24}$/)) {
          return res
            .status(400)
            .json({ message: "آیدی نامعتبر", result: null });
        }
        queryObject.brand = brandId;
      }
      if (categoryId) {
        if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
          return res
            .status(400)
            .json({ message: "آیدی نامعتبر", result: null });
        }
        queryObject.category = categoryId;
      }
      const skip = req.query.skip;
      const DEFAULT_LIMIT = 10;
      const products = await this.Product.find(queryObject)
        .skip(skip)
        .limit(DEFAULT_LIMIT);
      if (products.length == 0) {
        return res
          .status(200)
          .json({ message: "موردی برای نمایش وجود ندارد", result: null });
      }
      return res.status(200).json({ message: null, result: products });
    } catch (err) {
      console.log("get products error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async getProduct(req, res) {
    try {
      const id = req.params.id;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "آیدی نامعتبر", result: null });
      }
      const product = await this.Product.findById(id).populate([
        "brand",
        "category",
      ]);
      if (!product) {
        return res.status(400).json({ message: "کالا یافت نشد", result: null });
      }
      return res.status(200).json({ message: null, result: product });
    } catch (err) {
      console.log("get product  error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async addProduct(req, res) {
    try {
      
    } catch (err) {
      console.log("add product error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async editProduct(req, res) {
    try {
    } catch (err) {
      console.log("edit product error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async deleteProduct(req, res) {
    try {
    } catch (err) {
      console.log("delete product error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
})();
