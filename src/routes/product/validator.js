const expressValidator = require("express-validator");
check = expressValidator.check;
const Category = require("./../../models/category")
const Brand = require("./../../models/brand")
module.exports = new (class {
  addProduct() {
    return [
      check("name")
      .not().isEmpty()
      .withMessage("نام را وارد کنید"),
      check("price")
      .not()
      .isEmpty()
      .withMessage("قیمت را وارد کنید")
      .bail()
      .isNumeric()
      .withMessage("قیمت را درست وارد کنید"),
      check("description")
      .not()
      .isEmpty()
      .withMessage("توضیحات را وارد کنید"),
      check("country")
      .not()
      .isEmpty()
      .withMessage("کشور را وارد کنید"),
      check("categoryId").custom(async value=>{
        if(!value) return Promise.reject("آیدی دسته بندی را وارد کنید")
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return Promise.reject("آیدی دسته بندی نامعتبر")
        }
        const category = await Category.findById(value);
        if(!category){
          return Promise.reject("دسته بندی یافت نشد")
        }
      }),
      check("brandId").custom(async value=>{
        if(!value){
          return Promise.reject("آیدی برند را وارد کنید")
        }
        if (!value.match(/^[0-9a-fA-F]{24}$/)) {
          return Promise.reject("آیدی برند نامعتبر")
        }
        const brand = await Brand.findById(value);
        if(!brand){
          return Promise.reject("برند یافت نشد")
        }
      })
    ];
  }

})();
