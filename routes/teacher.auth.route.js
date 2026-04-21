// // const express = require('express'); 
// // const authController = require('../controllers/auth.controller');
// import express from 'express';
// import * as authController from '../controller/Controller.js';
// import { registerTeacher, loginTeacher,logout, forgotPassword, resetPassword } from '../controller/Controller.js'; 
// // import * as authController from '../controller/Controller.js';
// const router = express.Router();

// router.post('/registerStudent', authController.registerTeacher);
// router.post('/loginStudent', authController.loginTeacher);
// router.post('/logout', authController.logout);

// router.post('/forgot-password', authController.forgotPassword);  // ← À AJOUTER
// router.post('/reset-password', authController.resetPassword);  
// export default router;
/************************common js *******/

// routes/auth.route.js (version CommonJS)
const express = require('express');
const authController = require('../controller/Controller');

const router = express.Router();

router.post('/registerStudent', authController.registerTeacher);
router.post('/loginStudent', authController.loginTeacher);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;