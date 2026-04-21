var multer    = require('multer');
var path      = require('path');
var fs        = require('fs');
var constants = require('../config/constants');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = 'uploads/tmp';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    var unique = Date.now() + '-' + Math.round(Math.random() * 1000000);
    cb(null, unique + path.extname(file.originalname));
  }
});

function fileFilter(req, file, cb) {
  var ext  = path.extname(file.originalname).toLowerCase();
  var lang = constants.EXTENSION_MAP[ext];

  if (lang && constants.ALLOWED_LANGUAGES.indexOf(lang) !== -1) {
    if (!req.fileLanguages) {
      req.fileLanguages = [];
    }
    req.fileLanguages.push(lang);
    cb(null, true);
  } else {
    if (!req.fileErrors) {
      req.fileErrors = [];
    }
    req.fileErrors.push(
      'Extension non autorisee : ' + file.originalname +
      '  (acceptees : .c .js .java .html .css)'
    );
    cb(null, false);
  }
}

var upload = multer({
  storage:    storage,
  fileFilter: fileFilter,
  limits:     { fileSize: constants.MAX_FILE_SIZE }
});

var uploadMultiple = upload.array('codeFiles', constants.MAX_FILES);

module.exports = { uploadMultiple: uploadMultiple };