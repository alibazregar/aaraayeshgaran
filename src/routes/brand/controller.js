const controller = require("./../controller");
const fs = require("fs").promises;

module.exports = new (class extends controller {
  async getBrands(req, res) {
    try {
      const skip = req.query.skip;
      const DEFAULT_LIMIT = 10;
      const brands = await this.Brand.find({}).skip(skip).limit(DEFAULT_LIMIT);
      if (brands.length == 0) {
        return res
          .status(200)
          .json({ message: "موردی برای نمایش وجود ندارد", result: null });
      }
      return res.status(200).json({ message: null, result: brands });
    } catch (err) {
      console.log("get brands error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async getBrandAndBrandProducts(req, res) {
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
      const brand = await this.Brand.findById(id);
      if (!brand) {
        return res.status(400).json({ message: "برند یافت نشد", result: null });
      }
      const products = await this.Product.find({
        brand: id,
        price: { $gt: minPrice, $lt: maxPrice },
      })
        .skip(skip)
        .limit(DEFAULT_LIMIT);

      return res
        .status(200)
        .json({ message: null, result: { brand, products } });
   } catch (err) {
      console.log("get brand and get brand products error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async addBrand(req, res) {
    try {
      const {name,description} = req.body
      if(!req.file){
        return res.status(400).json({ message: "عکس برند را آپلود کنید", result: null})
      }
      const newBrand = new this.Brand({
        name:name,
        description:description,
        photo:req.file.path
      })
      await newBrand.save()
      return res.status(200).json({message:"برند با موفقیت اضافه شد"})

    } catch (err) {
      console.log("add brand error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async editBrand(req, res) {
    try {
      const id = req.params.id;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "آیدی نامعتبر", result: null });
      }
      const brand = await this.Brand.findById(id)
      if(!brand){
        return res.status(400).json({ message: "برند یافت نشد", result: null})
      }
      if(req.file){ 
       await fs.unlink(brand.photo)
        brand.photo = req.file.path
        await brand.save()

      }
     await this.Brand.updateOne({_id:id},req.body)
      
      return res.status(200).json({message:"با موفقیت به روز رسانی شد", result: null})


    } catch (err) {
      console.log("add brand error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
  async deleteBrand(req, res) {
    try {
      const id = req.params.id;
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "آیدی نامعتبر", result: null });
      }
      const brand = await this.Brand.findById(id)
      if(!brand){
        return res.status(400).json({ message: "برند یافت نشد", result: null})
      }
      await fs.unlink(brand.photo)
      await brand.delete()
      return res.status(200).json({ message: "با موفقیت حذف شد",result:null})

    } catch (err) {
      console.log("add brand error : " + err.message);
      return res.status(500).json({ message: "خطا در سرور ", result: null });
    }
  }
})();
