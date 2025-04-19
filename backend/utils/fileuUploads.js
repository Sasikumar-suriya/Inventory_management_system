const multer = require('multer');
const path = require('path');
const fs = require('fs');

const configureMulter = (options = {}) => {

  const {
    destination = 'uploads/',
    allowedFileTypes = /jpeg|jpg|png|gif|pdf|csv|mp4/,
    fileSizeLimit = 10 * 1024 * 1024, // 10MB
    allowMultipleFiles = false,
  } = options;
console.log(destination,'destination');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
      }
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type.'));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: fileSizeLimit },
  })[allowMultipleFiles ? 'any' : 'single']('file');
};

module.exports = configureMulter;
