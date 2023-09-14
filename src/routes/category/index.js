const express = require("express")
const router = express.Router()
const controller = require("./controller")
const upload = require("./../../middleware/uploadCategory")
const validator = require("./validator")
const {isLogined,isAdmin} = require("./../../middleware/auth")

router.get("/get",controller.getCategory)
router.get("/get/:id",controller.getCategoryAndCategoryProducts)
router.post("/add",isLogined,isAdmin,upload,validator.addCategory(),controller.validate,controller.addCategory)
router.patch("/edit/:id",isLogined,isAdmin,upload,controller.editCategory)
router.delete("/delete/:id",isLogined,isAdmin,controller.deleteCategory)




module.exports = router;