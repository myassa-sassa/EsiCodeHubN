var express        = require('express');
var router         = express.Router();
var uploadCtrl     = require('../controller/uploadController');
var uploadMidd     = require('../middleware/uploadMiddleware');

router.post('/files',  uploadMidd.uploadMultiple, uploadCtrl.uploadFiles);
router.post('/online', uploadCtrl.uploadOnline);

module.exports = router;