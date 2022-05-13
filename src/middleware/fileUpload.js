const multer = require("multer");
const path = require("path");

const imageStore = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./public/images");
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const limitSize = {
  fileSize: 2e6,
};

const imageFilter = (_req, file, cb) => {
  const extName = path.extname(file.originalname);
  const allowedExt = /jpg|png|jpeg|JPG|PNG|JPEG/;
  if (!extName.match(allowedExt)) return cb(new Error("Invalid image extension (jpg,jpeg,png)"), false);
  cb(null, true);
};

const imageUpload = multer({
  storage: imageStore,
  limits: limitSize,
  fileFilter: imageFilter,
}).single("photo");

const uploadFile = (req, res, next) => {
  imageUpload(req, res, (err) => {
    if (err) {
      res.status(400).json({
        error: err.message,
      });
      return;
    }
    next();
  });
};

module.exports = uploadFile;
