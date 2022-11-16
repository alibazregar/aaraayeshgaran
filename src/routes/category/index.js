const express = require("express")
const router = express.Router()
const controller = require("./controller")
const upload = require("./../../middleware/uploadCategory")
const validator = require("./validator")


router.get("/get",controller.getCategory)
router.get("/get/:id",controller.getCategoryAndCategoryProducts)
router.post("/add",upload.single("photo"),validator.addCategory(),controller.validate,controller.addCategory)
router.patch("/edit/:id",upload.single("photo"),controller.editCategory)
router.delete("/delete/:id",controller.deleteCategory)




module.exports = router;