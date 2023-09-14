const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function isLogined(req, res, next) {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ message: 'ابتدا وارد حساب خود شوید' });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "توکن منقضی شده است" });
    }

    req.user = user;
    next();
  } catch (ex) {
    console.error("authErr:", ex);
    return res.status(401).json({ message: 'Invalid token. Please log in again.', error: ex.message });
  }
}

function isAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Only admin users are allowed." });
  }
  
  next();
}

module.exports = {
  isLogined,
  isAdmin
};
