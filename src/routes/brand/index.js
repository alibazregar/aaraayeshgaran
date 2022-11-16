const express = require("express")
const router = express.Router()
const controller = require("./controller")
const upload = require("./../../middleware/uploadBrand")
const validator = require("./validator")


router.get("/get",controller.getBrands)
router.get("/get/:id",controller.getBrandAndBrandProducts)
router.post("/add",upload.single("photo"),validator.addBrand(),controller.validate,controller.addBrand)
router.patch("/edit/:id",upload.single("photo"),controller.editBrand)
router.delete("/delete/:id",controller.deleteBrand)




module.exports = router;