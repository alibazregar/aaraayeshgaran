const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/brands");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
  fileFilter :function(req, file, cb) {
    if(file.mimetype =="image/jpeg"||file.mimetype == "video/mp4") {
      cb(null,true)

    }else{
      cb("پسوند نامعتبر",false)
    }
  }
});
module.exports = multer({
  storage: storage,
});


