
// // const express =  require('express');
// // const userController = require('../controller/Controller');
// // const authController = require('../controller/User.js');
// import express from 'express';
// import authMiddleware from '../middleware/auth.middleware.js'; 

// import * as authController from '../controller/Controller.js';

// import * as userController from '../controller/User.js';
// import * as moduleController from '../controller/Module.js';
// import * as adminController from '../controller/Admin.js';
// import * as teacherController from '../controller/Teacher.js'

// import * as studentController from '../controller/Student.js';
// // const router = express.Router();
// // const authMiddleware = require('../middleware/auth.middleware');
// const router = express.Router();
// router.get('/admin', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'),adminController.getAllStudents);
// router.get('/admin/id/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'),adminController.getStudentById);
// router.get('/admin/teachers', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'),adminController.getAllTeachers);
// router.get('/admin/teachers/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'),adminController.getTeacherById);

// router.post('/modules', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), moduleController.addModule);

// router.post('/teachers/:id/assign-modules', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), adminController.assignModule);
// router.get('/teachers/:id/getModule', adminController.getModule);
// // router.post('/modules/:id/assign-courses', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), adminController.assignCoursesToModule);
// router.post('/courses/add',  authMiddleware.authenticateToken,  authMiddleware.authorizeRoles('admin'),  adminController.addCourses);
// export default router;


/***********common js  ******/


// routes/admin.route.js (version CommonJS avec commentaires conservés)
// // const express =  require('express');
// // const userController = require('../controller/Controller');
// // const authController = require('../controller/User.js');
const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');

const authController = require('../controller/Controller');
const userController = require('../controller/User');
const moduleController = require('../controller/Module');
const adminController = require('../controller/Admin');
const teacherController = require('../controller/Teacher');
const studentController = require('../controller/Student');

// const router = express.Router();
// const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/admin', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), adminController.getAllStudents);
router.get('/admin/id/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), adminController.getStudentById);
router.get('/admin/teachers', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), adminController.getAllTeachers);
router.get('/admin/teachers/:id', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), adminController.getTeacherById);
router.post('/modules/add', adminController.addModule);
router.delete('/modules/:id', adminController.deleteModule);
router.post('/users/add', adminController.addUser);

router.post('/modules', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), moduleController.addModule);
router.post('/teachers/:id/assign-modules', adminController.assignModule);

// router.post('/teachers/:id/assign-modules', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), adminController.assignModule);
router.get('/teachers/:id/getModule', adminController.getModule);
// router.post('/modules/:id/assign-courses', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), adminController.assignCoursesToModule);
router.post('/courses/add', authMiddleware.authenticateToken, authMiddleware.authorizeRoles('admin'), adminController.addCourses);

module.exports = router;