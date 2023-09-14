const express = require("express");
const router = express.Router();
const controller = require("./controller")
const validator = require("./validator")
router.post("/add",validator.addAddress(),controller.validate,controller.addAddress)
router.get("/",controller.getUserAddresses)
router.delete("/id/:id",controller.deleteUserAddress)
router.patch("/id/:id",controller.editUserAddress)
router.get("/id/:id",controller.getAddressByID)


module.exports = router;
