
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function isLogined(req,res,next){
  const token = req.header("token");
  if(!token) res.status(401).json({message:'ابتدا وارد حساب خود شوید'});
  try{
    const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    
    const user = await User.findById(decoded.id);
    req.user = user;
    if(!req.user){
      return res.status(401).json({message:"توکن منقضی شده است"})
    }
    next();
  }catch(ex){
    res.status(400).send('دوباره وارد حساب خود شوید');
    console.log("authErr:"+ex);
  }

}

module.exports = {
  isLogined
}