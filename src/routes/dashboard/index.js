const express = require("express");
const router = express.Router();
const controller = require("./controller")
const validator = require("./validator")
const {isLogined} = require("./../../middleware/auth")
router.use("/address",isLogined,require("./address"))
router.get("/comments",isLogined,controller.getComments)
router.patch("/edit-user",isLogined,controller.editUser)
router.get("/get-user",isLogined,controller.getUser)
router.post("/change-password",isLogined,validator.updatePassword(),controller.validate,controller.changePassword)


module.exports = router;
