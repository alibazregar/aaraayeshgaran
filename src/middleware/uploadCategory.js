const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./public/categories";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "_" +
        new Date().toISOString().replace(/:/g, "-") +
        path.extname(file.originalname)
    );
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(new multer.MulterError("INVALID_FILE_TYPE"));
    }
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, //1 mb
}).single("photo");

const uploadPhoto = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      // Handle Multer errors and return a 400 Bad Request response
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send({ message: "حجم فایل تصویری زیاد است" });
      }
      if (err.code === "INVALID_FILE_TYPE") {
        return res.status(400).send({ message: "نوع فایل درست نمی باشد" });
      }
      console.log("uploadErr:" + err.stack);
      return res
        .status(400)
        .send({ message: "خطایی در آپلود تصویر رخ داده است" });
    }
    next();
  });
};

module.exports = uploadPhoto;
