const express = require('express')
const router = express.Router()
const {isLogined, isAdmin} = require('./../middleware/auth')
const Message = require('../models/message')
const {check} = require("express-validator")


router.use("/admin",isLogined, isAdmin, require("./admin"))
router.use("/users",require("./users"))
router.use("/brand",require("./brand"))
router.use("/category",require("./category"))
router.use("/product",require("./product"))
router.use("/user-options",isLogined,require("./user-options"))
router.use("/dashboard",isLogined,require("./dashboard"))
router.use("/packages",isLogined,require("./packages"))
// Create endpoint to create a new message
router.post(
    '/messages',
    [
      check('email').isEmail().withMessage('Invalid email address'), // Validate email using express-validator
      check('message').notEmpty().withMessage('Message cannot be empty'),
      check("phone").isNumeric().isLength(10).withMessage("enter phone correctly"),
      check("name").isString().withMessage(" ENTER Name")
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const { email, message , phone , name } = req.body;
        const newMessage = new Message({ email, message, phone ,name });
        await newMessage.save();
        res.status(201).json(newMessage);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create message' });
      }
    }
  );
  
  
  router.get('/messages',isLogined,isAdmin ,async (req, res) => {
    try {
      const { startDate, endDate, sortBy, sortOrder, page, limit } = req.query;
      const query = {};
  
      if (startDate) query.date = { $gte: new Date(startDate) };
      if (endDate) query.date = { ...query.date, $lte: new Date(endDate) };
  
      const sortOptions = {};
      if (sortBy) sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
      const messages = await Message.find(query)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  });

 
module.exports = router
