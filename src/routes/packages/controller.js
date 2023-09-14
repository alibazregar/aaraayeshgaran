const { validationResult } = require("express-validator");
const controller = require("../controller");

class PackageController extends controller{
  async createPackage(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newPackage = new this.Package(req.body);
      await newPackage.save();

      res.status(201).json({ message: "بسته با موفقیت ایجاد شد", newPackage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطای سرور" });
    }
  }
  async addProductToPackage(req, res) {
    try {
      const packageId = req.params.id;
      const productId = req.body.productId;

      // Validate product ID
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "شناسه محصول نامعتبر است" });
      }

      // Check if the product exists in the database
      const productExists = await this.Product.exists({ _id: productId }); // Replace 'Product' with your actual model name
      if (!productExists) {
        return res.status(404).json({ message: "محصول موردنظر پیدا نشد" });
      }

      const updatedPackage = await this.Package.findByIdAndUpdate(
        packageId,
        { $addToSet: { products: productId } },
        { new: true }
      );

      if (!updatedPackage) {
        return res.status(404).json({ message: "بسته پیدا نشد" });
      }

     return res
        .status(200)
        .json({ message: "محصول با موفقیت به بسته اضافه شد", updatedPackage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطای سرور" });
    }
  }

  async editPackageProducts(req, res) {
    try {
      const packageId = req.params.id;
      const newProducts = req.body.products;

      const updatedPackage = await this.Package.findByIdAndUpdate(
        packageId,
        { products: newProducts }, // Update the products array with new products
        { new: true }
      );

      if (!updatedPackage) {
        return res.status(404).json({ message: "بسته پیدا نشد" });
      }

      res
        .status(200)
        .json({
          message: "محصولات بسته با موفقیت ویرایش شدند",
          updatedPackage,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطای سرور" });
    }
  }

  async deletePackage(req, res) {
    try {
      const packageId = req.params.id;

      const deletedPackage = await this.Package.findByIdAndDelete(packageId);

      if (!deletedPackage) {
        return res.status(404).json({ message: "بسته پیدا نشد" });
      }

      res.status(200).json({ message: "بسته با موفقیت حذف شد" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "خطای سرور" });
    }
  }
  async editPackagePrice(req, res) {
    try {
      const packageId = req.params.id;
      const newPrice = req.body.price;

      const updatedPackage = await this.Package.findByIdAndUpdate(
        packageId,
        { price: newPrice },
        { new: true }
      );

      if (!updatedPackage) {
        return res.status(404).json({ message: 'بسته پیدا نشد' });
      }

      res.status(200).json({ message: 'قیمت بسته با موفقیت ویرایش شد', updatedPackage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'خطای سرور' });
    }
  }
  
  async editPackageDiscount(req, res) {
    try {
      const packageId = req.params.id;
      const newDiscount = req.body.discount;

      const updatedPackage = await Package.findByIdAndUpdate(
        packageId,
        { discount: newDiscount },
        { new: true }
      );

      if (!updatedPackage) {
        return res.status(404).json({ message: 'بسته پیدا نشد' });
      }

      res.status(200).json({ message: 'تخفیف بسته با موفقیت ویرایش شد', updatedPackage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'خطای سرور' });
    }
  }
  
  async getAllPackages(req, res) {
    try {
      const page = parseInt(req.query.page) || 1; // Get the requested page number from query parameter
      const limit = parseInt(req.query.limit) || 10; // Get the requested limit from query parameter
      const skip = (page - 1) * limit;

      const totalCount = await Package.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);

      const packages = await Package.find().skip(skip).limit(limit);

      res.status(200).json({ packages, totalPages, currentPage: page });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'خطای سرور' });
    }
  }
  async getPackageWithProducts(req, res) {
    try {
      const packageId = req.params.id;

      const packageWithProducts = await Package.findById(packageId).populate('products'); // Assuming you have a 'products' field in your Package schema

      if (!packageWithProducts) {
        return res.status(404).json({ message: 'بسته پیدا نشد' });
      }

      res.status(200).json(packageWithProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'خطای سرور' });
    }
  }
}

module.exports = PackageController;
