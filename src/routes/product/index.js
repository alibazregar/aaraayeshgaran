const express = require("express")
const router = express.Router()
const controller = require("./controller")
const upload = require("./../../middleware/uploadProduct")
const validator = require("./validator")


router.get("/get",controller.getProducts)
router.get("/get/:id",controller.getProduct)
router.post("/add",upload.single("photo"),validator.addProduct(),controller.validate,controller.addProduct)
router.patch("/edit/:id",upload.single("photo"),controller.editProduct)
router.delete("/delete/:id",controller.deleteProduct)




module.exports = router;