var express   = require('express');
var router    = express.Router();
var constants = require('../config/constants');

router.get('/', function (req, res) {
  return res.json({
    success:          true,
    languages:        constants.ALLOWED_LANGUAGES,
    submission_types: constants.ALLOWED_SUB_TYPES,
    error_message:    null
  });
});

module.exports = router;