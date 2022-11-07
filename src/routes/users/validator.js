const expressValidator = require('express-validator')
check = expressValidator.check
module.exports = new class {
    signUp(){
        return[
            check("firstName")
            .not()
            .isEmpty()
            .withMessage("نام خود را وارد کنید")
            .bail()
            .isLength({min:3})
            .withMessage("نام را درست وارد کنید"), 
            check("lastName")
            .not()
            .isEmpty()
            .withMessage("نام خانوادگی خود را وارد کنید")
            .bail()
            .isLength({min:4})
            .withMessage("نام خانوادگی را را درست وارد کنید"),
           
            check("phone")
            .not()
            .isEmpty()
            .withMessage("شماره خود را وارد کنید")
            .bail()
            .isInt()
            .withMessage("شماره را درست وارد کنید")
            .bail()
            .isLength(10)
            .withMessage("شماره را درست وارد کنید"),
        

            check("email")
            .not()
            .isEmpty()
            .withMessage("ایمیل خود را وارد کنید")
            .bail()
            .isEmail()
            .withMessage("ایمیل را درست وارد کنید"),
            check("confirmPassword")
            .not()
            .isEmpty()
            .withMessage("رمز خود را تایید کنید")
            .bail()
            .isLength({min:6})
            .withMessage("رمز را درست وارد کنید"),
            check("password")
            .not()
            .isEmpty()
            .withMessage("رمز خود را وارد کنید")
            .bail()
            .isLength({min:6})
            .withMessage("رمز را درست تایید کنید"),]
           
    }
    sendVerifyCode() {
        return[
            check("phone")
            .not()
            .isEmpty()
            .withMessage("شماره وارد نشده است")
            .bail()
            .isLength(10)
            .withMessage("شماره را درست وارد کنید")

        

            
        ]
    }
    verify() {
        return[
            
        ]
    }
}