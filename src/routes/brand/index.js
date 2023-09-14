const express = require("express")
const router = express.Router()
const controller = require("./controller")
const upload = require("./../../middleware/uploadBrand")
const validator = require("./validator")
const {isAdmin,isLogined} = require("../../middleware/auth")

router.get("/get",controller.getBrands)
router.get("/get/:id",controller.getBrandAndBrandProducts)
router.post("/add",isLogined,isAdmin,upload,validator.addBrand(),controller.validate,controller.addBrand)
router.patch("/edit/:id",isLogined,isAdmin,controller.editBrand)
router.delete("/delete/:id",isLogined,isAdmin,controller.deleteBrand)




module.exports = router;