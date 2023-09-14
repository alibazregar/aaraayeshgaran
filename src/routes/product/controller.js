const controller = require("../controller");
const fs = require("fs").promises;

module.exports = new (class extends controller {
  async getProducts(req, res) {
    try {
      let minPrice = req.query.MinPrice;
      let maxPrice = req.query.MaxPrice;
      let brandId = req.query.BrandId;
      let categoryId = req.query.categoryId;
      let country = req.query.country;
      let discount = req.query.discount;
      let sortByPrice = req.query.sortByPrice;
      if (!maxPrice) {
        maxPrice = 9999999999;
      }
      if (!minPrice) {
        minPrice = 1;
      }
      let queryObject = { price: { $gt: minPrice, $lt: maxPrice } };
      let sortObject = {}
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
      if(country){
        queryObject.country = country
      }
      if(discount == true){
        sortObject.discount=  -1 
      }
      if(sortByPrice>0){
        sortObject.price = 1 
      }
      if(sortByPrice<0){
        sortObject.price = -1 
      }

      const skip = req.query.skip;
      const DEFAULT_LIMIT = 10;
      const products = await this.Product.find(queryObject)
        .skip(skip)
        .limit(DEFAULT_LIMIT)
        .sort(sortObject)
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
      const { brandId, categoryId, name, price, description, colorAndNumbers, extraAttributes,englishTitle,specification,details,country} = 
        req.body;
      if (!Array.isArray(colorAndNumbers) || colorAndNumbers.length == 0) {
        return res
          .status(400)
          .json({ message: "تعداد و رنگ را درست وارد کنید", result: null });
      }
    //  if (!req.files || req.files.length == 0) {
      //  return res
          // .status(400)
          // .json({ message: "تصاویر را وارد کنید", result: null });
      // }
      const array = [];
//      for (let photo of req.files) {
//        array.push(photo.path);
//      }
      const newProduct = new this.Product({
        brand: brandId,
        category: categoryId,
        name: name,
        price: price,
        description: description,
        colorAndNumbers: colorAndNumbers,
        photos: array || [],
        extraAttributes : extraAttributes,
        englishTitle,specification,details,country
      });
      await newProduct.save();
      return res
        .status(200)
        .json({ message: "اضافه کردن کالا با موفقیت انجام شد", result: null });
    } catch (err) {
      console.log("add product error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async editProduct(req, res) {
    try {
      const id = req.params.id;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "آیدی نامعتبر", result: null });
      }
      const product = await this.Product.findById(id);
      if (!product) {
        return res.status(400).json({ message: "کالا یافت نشد", result: null });
      }
      await this.Product.updateOne({ _id: req.params.id }, req.body);
      return res
        .status(200)
        .json({ message: "ویرایش کالا با موفقیت انجام شد", result: null });
    } catch (err) {
      console.log("edit product error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "آیدی نامعتبر", result: null });
      }
      const product = await this.Product.findById(id);
      if (!product) {
        return res.status(400).json({ message: "کالا یافت نشد", result: null });
      }
      for (let photo of product.photos) {
        await fs.unlink(photo);
      }
      await product.delete();
      return res
        .status(200)
        .json({ message: "حذف کالا با موفقیت انجام شد", result: null });
    } catch (err) {
      console.log("delete product error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async deleteProductPhoto(req, res) {
    try {
      const id = req.params.id;
      const index = req.body.index;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "آیدی نامعتبر", result: null });
      }
      const product = await this.Product.findById(id);
      if (!product) {
        return res.status(400).json({ message: "کالا یافت نشد", result: null });
      }
      if (product.photos.length == 0 || product.photos.length == 1) {
        return res
          .status(400)
          .json({ message: "کالا باید حداقل یک عکس داشته باشد", result: null });
      }
      if (!product.photos[index]) {
        return res
          .status(400)
          .json({ message: "تصویر یافت نشد", result: null });
      }
      await fs.unlink(product.photos[index]);
      product.photos.splice(index, index + 1);
      await product.save();

      return res
        .status(200)
        .json({ message: "حذف تصاویر با موفقیت انجام شد", result: null });
    } catch (err) {
      console.log("delete product photo error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async addProductPhoto(req, res) {
    try {
      const { id } = req.params;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "آیدی نامعتبر", result: null });
      }
      const product = await this.Product.findById(id);
      if (!req.files || req.files.length == 0) {
        return res
          .status(400)
          .json({ message: "تصاویر را وارد کنید", result: null });
      }
      if (req.files.length + product.photos.length > 10) {
        return res.status(400).json({
          message: "حداکثر تعداد عکس برای یک کالا 10 عکس است",
          result: null,
        });
      }
      req.files.forEach((file) => {
        product.photos.push(file.path);
      });
      await product.save();
      return res.status(200).json({
        message: "به روز رسانی تصاویر با موفقیت انجام شد",
        result: null,
      });
    } catch (err) {
      console.log("delete product photo error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
})();
