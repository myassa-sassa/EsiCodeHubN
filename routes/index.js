
const express = require('express');
const router = express.Router();
const uploadRoutes = require('./uploadRoutes');
const submissionRoutes = require('./submissionRoutes');
// const languageRoutes = require('./languageRoutes');
const authRoutes = require('./auth.route');  // ← AJOUTEZ CETTE LIGNE !!!
const studentController = require('../controller/Student');  // ← AJOUTE CETTE LIGNE



router.use('/upload', uploadRoutes);
router.use('/submissions', submissionRoutes);
// router.use('/languages', languageRoutes);
router.use('/auth', authRoutes);
router.use('/auth', authRoutes);              // ← Ajoutez cette ligne
router.post('/questions/recherche', studentController.getQuestionByTitle);
router.post('/questions/recherche/module', studentController.getQuestionByModule);
router.post('/questions/recherche/language', studentController.getQuestionByLanguage);  // ← AJOUTE CETTE LIGNE
router.post('/questions/with-code', studentController.addQuestionWithCode);
router.post('/questions/simple', studentController.addQuestionSimple);
module.exports = router;


// var express = require('express');
// var router  = express.Router();

router.use('/upload',      require('./uploadRoutes'));
router.use('/submissions', require('./submissionRoutes'));
router.use('/languages',   require('./languageRoutes'));

module.exports = router;