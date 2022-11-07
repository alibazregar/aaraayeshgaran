const express = require("express")
const router = express.Router()
const controller = require("./controller")
const validator = require("./validator")


router.post("/signup",validator.signUp(),controller.validate,controller.signUp)
router.post("/send-verify-code",validator.sendVerifyCode(),controller.validate,controller.sendVerifyCode)
router.patch("/verify",validator.verify(),controller.validate,controller.verify)


module.exports = router;