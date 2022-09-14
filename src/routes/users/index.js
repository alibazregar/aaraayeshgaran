const express = require("express")
const router = express.Router()
const controller = require("./controller")
const validator = require("./validator")


router.post("/signup",validator.signUp(),controller.validate,controller.signUp)
router.patch("/verify",validator.verify(),controller.verify)


module.exports = router;