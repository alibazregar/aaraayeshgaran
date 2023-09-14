const express = require('express');
const { check, } = require('express-validator');
const PackageController = require('./controller');

const router = express.Router();
const packageController = new PackageController();
const validateIdParam = require('express-validator').param('id').isMongoId().withMessage('شناسه نامعتبر است');
router.post(
  '/create',
  [
    check('name').notEmpty().withMessage('نام بسته الزامی است'),
  ],packageController.validate,
  packageController.createPackage
);

router.post('/:id/add-package', packageController.addProductToPackage);
router.put('/:id/edit-packages', packageController.editPackageProducts);
router.delete('/:id/delete', packageController.deletePackage);
router.put('/:id/edit-price',packageController.validate, [validateIdParam, check('price').isNumeric()], packageController.editPackagePrice);
router.put('/:id/edit-discount', packageController.validate,[validateIdParam, check('discount').isNumeric()], packageController.editPackageDiscount);
router.get('/all', packageController.getAllPackages);
router.get('/:id/populated', validateIdParam, packageController.getPackageWithProducts);

module.exports = router;
