const express = require("express")
const router = express.Router()
const controller = require("./controller")
const validator = require("./validator")
const {isLogined, isAdmin} = require('./../../middleware/auth')

router.post("/signup",validator.signUp(),controller.validate,controller.signUp)
router.post("/send-verify-code",validator.sendVerifyCode(),controller.validate,controller.sendVerifyCode)
router.patch("/verify",validator.verify(),controller.validate,controller.verify)
router.post("/login",validator.login(),controller.validate,controller.login)
router.post("/login-email",validator.loginWithEmail(),controller.validate,controller.loginWithEmail)
router.get('/', isLogined, isAdmin,controller.getUsers);
router.get('/:id',isLogined, isAdmin, controller.getUserById);
router.put('/user', [
    check('email').isEmail().optional(),
    check('phone').isNumeric().optional(),
    check('nationalNumber').isNumeric().optional(),
    check('birthDate').isISO8601().optional(),
    check('isVerified').isBoolean().optional()
  ], controller.editUser);
// Route for getting the details of the logged-in user
router.get('/me',isLogined, controller.getLoggedInUser);

module.exports = router;