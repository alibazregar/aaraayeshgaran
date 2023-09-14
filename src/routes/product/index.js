const express = require("express")
const router = express.Router()
const controller = require("./controller")
const upload = require("./../../middleware/uploadProduct")
const validator = require("./validator")
const {isAdmin,isLogined} = require("./../../middleware/auth")

router.get("/get",controller.getProducts)
router.get("/get/:id",controller.getProduct)
router.post("/add",isLogined,isAdmin, upload,validator.addProduct(),controller.validate,controller.addProduct)
router.patch("/edit/:id",isLogined,isAdmin,controller.editProduct)
router.delete("/delete/:id",isLogined,isAdmin,controller.deleteProduct)
router.post("/delete-photo/:id",isLogined,isAdmin,controller.deleteProductPhoto)
router.post('/add-photo/:id',isLogined,isAdmin,upload,controller.addProductPhoto)




module.exports = router;