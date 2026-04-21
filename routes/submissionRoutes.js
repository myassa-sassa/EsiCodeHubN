

var express   = require('express');
var router    = express.Router();
var subCtrl   = require('../controller/submissionController');

router.get   ('/search', subCtrl.searchSubmissions);
router.get   ('/:id',    subCtrl.getSubmission);
router.put   ('/:id',    subCtrl.editSubmission);
router.delete('/:id',    subCtrl.deleteSubmission);

module.exports = router;